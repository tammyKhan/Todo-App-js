// ___________  Theme Toggle start ___________
  const toggle = document.getElementById('themeToggle');
  const sunIcon = document.getElementById('sunIcon');
  const moonIcon = document.getElementById('moonIcon');

  // Apply saved theme from localStorage
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.documentElement.classList.add('dark');
    sunIcon.classList.remove("bg-[#1F0356]");
    moonIcon.classList.add("bg-[#1F0356]");
    sunIcon.classList.add('hidden');
      moonIcon.classList.remove('hidden');
  } else {
    document.documentElement.classList.remove('dark');
    moonIcon.classList.remove("bg-[#1F0356]");
    sunIcon.classList.add("bg-[#1F0356]");
     moonIcon.classList.add('hidden');
      sunIcon.classList.remove('hidden');
  }

  toggle.addEventListener('click', () => {
    const isDark = document.documentElement.classList.contains('dark');

    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      moonIcon.classList.remove("bg-[#1F0356]");
      moonIcon.classList.add('hidden');
      sunIcon.classList.remove('hidden');
      sunIcon.classList.add("bg-[#1F0356]");
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      sunIcon.classList.remove("bg-[#1F0356]");
      sunIcon.classList.add('hidden');
      moonIcon.classList.remove('hidden');
      moonIcon.classList.add("bg-[#1F0356]");
    }
  });

// ___________  theme toggle end  ____________
   
