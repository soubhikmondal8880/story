
export async function fetchStorylines(storyId) {
    const cacheKey = `storylines_hierarchy_${storyId}`;
    const cachedData = localStorage.getItem(cacheKey);


    // if (cachedData) {
    //     // If cached data exists, return it
    //     return JSON.parse(cachedData);
    // }

    // Retrieve token from localStorage
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('No token found, please log in first.');
    }


    try {
        const response = await fetch(`https://storyway1-v1.onrender.com/getStoryline/${storyId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            // Handle errors from the server
            throw new Error('Failed to fetch storylines');
        }

        const storylines = await response.json();
        console.log("sdfsdfd", storylines)

        const hierarchicalData = buildHierarchy(storylines);

        // Store the fetched data in localStorage
        localStorage.setItem(cacheKey, JSON.stringify(hierarchicalData));
        return hierarchicalData;
    } catch (error) {
        console.error(error.message);
        throw error; // Re-throw the error to be handled by the calling code
    }
}



const buildHierarchy = (storylines) => {
    const map = {};
    const roots = [];

    // Initialize the map with storylines
    storylines.forEach(storyline => {
        map[storyline.storylineId] = { ...storyline, children: [] };
    });

    // Build the hierarchy
    storylines.forEach(storyline => {
        // Check if storyline has a parent ID
        if (storyline.pid === 0 || storyline.pid === undefined) {
            // No parent ID, add as root
            roots.push(map[storyline.storylineId]);
        } else {
            // Parent ID exists, add to parent's children
            const parent = map[storyline.pid];
            if (parent) {
                parent.children.push(map[storyline.storylineId]);
            } else {
                console.warn(`Parent with ID ${storyline.pid} not found for storyline ${storyline.storylineId}`);
            }
        }
    });
    console.log(roots);
    return roots;
};



export function findStoryline(storylineId, storylines) {
    for (let storyline of storylines) {
        if (storyline.storylineId === parseInt(storylineId)) {
            return storyline;
        }
        const childStoryline = findStoryline(storylineId, storyline.children);
        if (childStoryline) {
            return childStoryline;
        }
    }
    return null;
}


export async function addStoryline(storyId, title, content, selectedParent) {
    const token = localStorage.getItem('token')

    await fetch('https://storyway1-v1.onrender.com/addStoryline', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ story: { storyId: storyId }, pid: selectedParent, title: title, content: content })
    })
        .then(response => response.text())
        .then(data => {
            console.log('Success:', data);

            alert(data)
        })
        .catch((error) => {
            console.error('Error:', error);
        });

}