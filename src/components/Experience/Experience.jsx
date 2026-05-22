import { FaJava, FaDatabase, FaServer, FaShieldAlt, FaHtml5, FaCss3Alt, FaCloud } from "react-icons/fa";
import { SiSpring, SiHibernate, SiJunit5, SiCplusplus, SiMysql, SiPython, SiJavascript, SiPostgresql, SiJenkins, SiSonarqube, SiGithub, SiReact } from "react-icons/si";
import psitImg from "../../assets/psit-logo-1.jpeg";
import tcsLogo from "../../assets/tcs-logo.webp";
import {easeOut, motion} from "framer-motion";

const floatingAnimation = {
  initial: { y: 0 },
  animate: { y: [0, -6, 0], transition: { duration: 2, repeat: Infinity } },
};
const experiences = [
  {
    company: "Tata Consultancy Services",
    role: "Software Engineer",
    duration: "Present",
    description: [
      "Worked on enterprise Data Quality applications involving rule configuration, workflow management, scheduling, and automated alerting.",
      "Developed and optimized REST APIs and PostgreSQL queries for large-scale data validation systems.",
      "Improved CI/CD automation with Jenkins, SonarQube quality checks, and Fortify security scans.",
      "Supported cloud-based deployments and production readiness in Azure environments.",
      "Collaborated with Agile teams and used GitHub Copilot to accelerate implementation and code quality.",
    ],
    logo: tcsLogo,
    technologies: [
      { icon: <FaJava size={22} className="text-orange-400" />, name: "Java" },
      { icon: <SiSpring size={22} className="text-green-500" />, name: "Spring Boot" },
      { icon: <SiPostgresql size={22} className="text-blue-500" />, name: "PostgreSQL" },
      { icon: <FaServer size={22} className="text-cyan-400" />, name: "REST APIs" },
      { icon: <FaCloud size={22} className="text-sky-500" />, name: "Azure" },
      { icon: <SiJenkins size={22} className="text-red-500" />, name: "Jenkins" },
      { icon: <SiSonarqube size={22} className="text-teal-400" />, name: "SonarQube" },
      { icon: <FaShieldAlt size={22} className="text-indigo-400" />, name: "Fortify" },
      { icon: <SiJunit5 size={22} className="text-red-400" />, name: "JUnit" },
      { icon: <SiGithub size={22} className="text-white" />, name: "GitHub Copilot" },
    ],
  },
  {
    company: "Nucleus Software",
    role: "Software Engineer",
    duration: "Feb 2024 - Aug 2024",
    description: [
      "Developed responsive UI modules and backend functionality for enterprise financial applications.",
      "Worked on business logic integration, RESTful APIs, and reporting solutions in Agile teams.",
    ],
    logo: "https://toppng.com/uploads/preview/nucleus-software-logo-11609370525scxmzzrjnf.png",
    technologies: [
      { icon: <SiReact size={22} className="text-sky-400" />, name: "React.js" },
      { icon: <FaJava size={22} className="text-orange-400" />, name: "Java" },
      { icon: <SiSpring size={22} className="text-green-500" />, name: "Spring MVC" },
      { icon: <FaDatabase size={22} className="text-blue-400" />, name: "Oracle DB" },
      { icon: <FaServer size={22} className="text-cyan-400" />, name: "REST APIs" },
      { icon: <FaHtml5 size={22} className="text-orange-500" />, name: "HTML" },
      { icon: <FaCss3Alt size={22} className="text-blue-500" />, name: "CSS" },
      { icon: <SiJavascript size={22} className="text-yellow-400" />, name: "JavaScript" },
    ],
  },
  {
    company: "Bachelor Of Technology, Computer Science",
    role: "Student",
    duration: "Dec 2020 - Jul 2024",
    description: ["Completed my graduation in Computer Science", "GPA: 8.2"],
    logo: psitImg,
    technologies: [
      { icon: <SiCplusplus size={22} className="text-blue-400" />, name: "C++" },
      { icon: <SiJavascript size={22} className="text-yellow-400" />, name: "JavaScript" },
      { icon: <SiPython size={22} className="text-green-300" />, name: "Python" },
      { icon: <SiMysql size={22} className="text-indigo-400" />, name: "MySQL" },
    ],
  },
];

const Experience = () => {
  return (
    <div id="Experience" 
    className="p-10 md:p-24">
      <h1 className="text-3xl md:text-4xl font-bold text-white text-center mb-10">Experience</h1>

      {/* Experience Cards Container */}
      <div className="grid gap-6 md:gap-8 grid-cols-1">
        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            className="relative group bg-zinc-900 p-6 rounded-lg shadow-lg overflow-hidden"
            initial={{ opacity: 0, x: index%2 ? 120 : -120 }}
            whileInView={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.03, boxShadow: "0 20px 40px rgba(99,102,241,0.12)" }}
            transition={{ duration: 0.35 }}
          >
            {/* Hover light background */}
            <div className="absolute inset-0 rounded-lg pointer-events-none bg-gradient-to-r from-indigo-500/5 via-sky-400/4 to-transparent opacity-0 group-hover:opacity-100 transform scale-95 group-hover:scale-100 transition-all duration-300 blur-xl"></div>
            <div className="relative z-10">
            {/* Company Logo */}
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 md:w-24 md:h-24 flex items-center justify-center bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-lg overflow-hidden ring-1 ring-white/10 shadow-sm">
                <img src={exp.logo} alt={exp.company} className="max-w-[85%] max-h-[85%] object-contain" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white">{exp.role}</h2>
                <p className="text-gray-400 text-sm">{exp.duration}</p>
              </div>
            </div>

            {/* Description */}
            <ul className="mt-4 text-gray-300 text-sm space-y-2">
              {exp.description.map((desc, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 bg-blue-400 rounded-full"></span> {desc}
                </li>
              ))}
            </ul>

            {/* Technologies Used */}
            <div className="mt-4 flex flex-wrap gap-3">
              {exp.technologies.map((tech, i) => (
                <motion.span
                  key={i}
                  {...floatingAnimation}
                  whileHover={{ scale: 1.05, boxShadow: "0 8px 20px rgba(255,255,255,0.06)" }}
                  className="flex items-center gap-2 bg-gray-800 px-3 py-1 rounded-full text-white text-xs"
                >
                  {tech.icon} <span className="hidden sm:inline">{tech.name}</span>
                </motion.span>
              ))}
            </div>
          </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Experience;
