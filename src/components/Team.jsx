
import React, { useState } from 'react'


const Team = () => {

    const people = [
        {
            firstname: "Harshvardhan",
            lastname: "Sharma",
            role: "Full Stack Developer",
            picture: "/Harsh.jpg",
            description: "A versatile developer skilled in crafting efficient web solutions and enhancing user experiences. Combining technical expertise with a keen eye for detail, he excels at solving complex challenge",
            facebookURL: "#link",
            twitterURL: "#link",
            linkedinURL: "https://www.linkedin.com/in/harshvardhan-sharma-a11399260/",
            youtubeURL: "#link",
        },
        {
            firstname: "Soubhik",
            lastname: "Mondal",
            role: "Frontend Developer",
            picture: "/soubhik.jpg",
            description: "Harum iusto exercitationem assumenda quas nostrum perspiciatis quos iste sit reprehenderit, libero quae aperiam sapiente delectus, porro tempore minus repellendus ratione distinctio!",
            facebookURL: "#link",
            twitterURL: "#link",
            linkedinURL: "https://www.linkedin.com/in/soubhik-mondal-8880/",
            youtubeURL: "#link",
        },

        {
            firstname: "Soumya",
            lastname: "Chattopadhaya",
            role: "Frontend Developer",
            picture: "/Soumya.jpg",
            description: "A versatile developer skilled in crafting efficient web solutions and enhancing user experiences. Combining technical expertise with a keen eye for detail, he excels at solving complex challenge",
            facebookURL: "#link",
            twitterURL: "#link",
            linkedinURL: "https://www.linkedin.com/in/soumya-chattopadhyay-389209227/",
            youtubeURL: "#link",
        },

    ]

    const [member, setMember] = useState(0)

    return (
        <div className="relative mx-auto py-10 w-full  bg-gray-50 text-gray-700 ">

            {/* :TITLE CONTAINER */}
            <div className="mb-8 flex justify-center items-center">
                <span className="h-1 w-14 rounded-3xl bg-gray-700" />
                <h2 className="px-3 text-sm font-semibold uppercase">Our passionate team</h2>
                <span className="h-1 w-14 rounded-3xl bg-gray-700" />
            </div>

            <div className="mx-auto px-4 w-full max-w-5xl grid grid-cols-2 gap-y-4 sm:gap-y-10">

                {/* :PICTURES CONTAINER */}
                <div className="col-span-full lg:col-span-1 flex flex-col sm:flex-row justify-center items-center">
                    {/* ::Team members */}
                    <ul className="mb-4 sm:mb-0 px-4 flex sm:flex-col justify-center items-center space-x-3 sm:space-x-0 sm:space-y-3">
                        {people.map((person, index) => (
                            <li key={person.lastname} className={`w-12 h-12 rounded-full overflow-hidden filter ${index !== member ? "saturate-0 hover:brightness-125" : "saturate-100"}`}>
                                <button className="w-full h-full" onClick={() => setMember(index)}>
                                    <img src={person.picture} alt="" className="object-cover" />
                                </button>
                            </li>
                        ))
                        }
                    </ul>
                    {/* ::Picture selected team member */}
                    <div className="rounded overflow-hidden">
                        <img src={people[member].picture} alt="" className="w-full max-w-xs object-cover" />
                    </div>
                </div>


                {/* :DETAILS CONTAINER */}
                <div className="col-span-full lg:col-span-1 mx-auto lg:mx-0 max-w-lg flex flex-col justify-center space-y-4">
                    {/* ::Role */}
                    <span className="font-bold uppercase tracking-wider">{people[member].role}</span>
                    {/* ::Name */}
                    <h3 className="text-4xl sm:text-5xl font-bold space-y-2">
                        <span className="block">{people[member].firstname}</span>
                        <span className="block">{people[member].lastname}</span>
                    </h3>
                    {/* ::Description */}
                    <p className="py-2 text-base">{people[member].description}</p>
                    {/* ::Socials */}
                    <div className="mb-4 inline-flex space-x-4">



                        {/* Linkedin */}
                        <a href={people[member].linkedinURL} className="text-gray-600 hover:text-red-600">
                            <svg className="w-6 h-6" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30"><path d="M9,25H4V10h5V25z M6.501,8C5.118,8,4,6.879,4,5.499S5.12,3,6.501,3C7.879,3,9,4.121,9,5.499C9,6.879,7.879,8,6.501,8z M27,25h-4.807v-7.3c0-1.741-0.033-3.98-2.499-3.98c-2.503,0-2.888,1.896-2.888,3.854V25H12V9.989h4.614v2.051h0.065 c0.642-1.18,2.211-2.424,4.551-2.424c4.87,0,5.77,3.109,5.77,7.151C27,16.767,27,25,27,25z" /></svg>
                        </a>
                        {/* Youtube */}

                    </div>
                </div>

            </div>
        </div>
    )
}

export default Team;
