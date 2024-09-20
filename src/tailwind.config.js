module.exports = {
    theme: {
      extend: {
        animation: {
          'fade-in': 'fade-in 1s ease-in-out',
          'slide-up': 'slide-up 0.7s ease-out',
          'bounce-in': 'bounce-in 0.8s ease-out',
          'pulse': 'pulse 1s infinite',
          'bounce': 'bounce 1s infinite',
        },
        keyframes: {
          'fade-in': {
            '0%': { opacity: '0' },
            '100%': { opacity: '1' },
          },
          'slide-up': {
            '0%': { transform: 'translateY(100px)', opacity: '0' },
            '100%': { transform: 'translateY(0)', opacity: '1' },
          },
          'bounce-in': {
            '0%': { transform: 'scale(0)', opacity: '0' },
            '100%': { transform: 'scale(1)', opacity: '1' },
          },
          'pulse': {
            '0%, 100%': { transform: 'scale(1)' },
            '50%': { transform: 'scale(1.05)' },
          },
          'bounce': {
            '0%, 100%': { transform: 'translateY(0)' },
            '50%': { transform: 'translateY(-10px)' },
          },
        },
      },
    },
    plugins: [],
  }
  