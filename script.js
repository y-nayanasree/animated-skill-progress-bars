
const skillsSection = document.getElementById("skillsSection");
const skills = document.querySelectorAll(".skill");
const replayBtn = document.getElementById("replayBtn");

let hasAnimated = false;

function animateSkills() {
  skills.forEach((skill) => {
    const target = Number(skill.dataset.progress);
    const bar = skill.querySelector(".progress-fill");

    bar.style.width = `${target}%`;
  });

  hasAnimated = true;
}

function resetSkills() {
  skills.forEach((skill) => {
    const bar = skill.querySelector(".progress-fill");
    bar.style.width = "0%";
  });

  hasAnimated = false;

  // Allow the browser to apply the reset before restarting.
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      animateSkills();
    });
  });
}

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasAnimated) {
          animateSkills();
          observer.unobserve(skillsSection);
        }
      });
    },
    { threshold: 0.2 }
  );

  observer.observe(skillsSection);
} else {
  // Fallback for browsers without IntersectionObserver.
  animateSkills();
}

replayBtn.addEventListener("click", resetSkills);
