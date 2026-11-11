/* =========================================================================
   USD Perception & Robotics Group — site content
   -------------------------------------------------------------------------
   The only file you need to edit to update the site. Add or remove entries,
   commit, done. Every array below is plain JavaScript.
   ========================================================================= */

/* ------------------------------------------------------------- site --- */
const SITE = {
  name: "Perception & Robotics Group",
  shortName: "PRG",
  university: "University of San Diego",
  department: "Department of Computer Science",
  founded: "2026",
  email: "prg@sandiego.edu",
  addressLine1: "5998 Alcalá Park",
  addressLine2: "San Diego, CA 92110",
  maps: "https://maps.google.com/?q=University+of+San+Diego",
  linkedin: "https://www.linkedin.com/company/usd-prg",
  github: "https://github.com/USD-PRG",
  x: "https://x.com/USDprg",
};

/* ----------------------------------------------------------- people --- */
/* group: "faculty" | "postdoc" | "phd" | "masters" | "undergrad" | "alumni"
   links accepted: email, github, scholar, linkedin, website */
const PEOPLE = [
  {
    name: "Faculty director",
    role: "Position open",
    group: "faculty",
    focus:
      "We are recruiting the group's founding director. Until the appointment is made, this page lists the roles we are hiring for.",
  },
];

/* Roles we are actively looking to fill. */
const OPEN_ROLES = [
  { role: "Ph.D. and M.S. researchers", note: "Funded positions in perception, estimation, and robot learning." },
  { role: "Undergraduate research assistants", note: "Paid semester assistantships for USD undergraduates." },
  { role: "Postdoctoral researcher", note: "Perception, state estimation, and field autonomy." },
];

/* --------------------------------------------------------- research --- */
const RESEARCH = [
  {
    id: "slam",
    number: "01",
    title: "SLAM and 3D reconstruction",
    short:
      "Localization and dense mapping for robots operating in unstructured, GPS-denied environments.",
    body:
      "We build estimation pipelines that fuse lidar, vision, inertial, and leg odometry into a single metric-consistent map. The work targets long-duration autonomy: loop closure that survives perceptual aliasing, map representations that stay compact over kilometres of travel, and reconstructions dense enough to plan against.",
    image: "assets/img/research-slam.jpg",
    caption: "Sparse map and estimated trajectory, GPS-degraded run",
    bullets: [
      "Multi-modal factor-graph and sliding-window estimators",
      "Learned loop closure and place recognition",
      "Dense neural and volumetric map representations",
    ],
    tags: ["SLAM", "State Estimation", "3D Vision"],
  },
  {
    id: "aerial",
    number: "02",
    title: "Aerial robotics",
    short:
      "Onboard perception, trajectory generation, and long-endurance flight for small uncrewed aircraft.",
    body:
      "Aerial platforms are our fastest-moving testbed. We study compute-aware perception stacks that run entirely onboard, trajectory generation in cluttered space, and inspection behaviours that stay safe when the map is wrong. Field deployments keep us honest about wind, dust, and battery.",
    image: "assets/img/research-aerial.jpg",
    caption: "Multirotor platform during a campus survey flight",
    bullets: [
      "Onboard perception on embedded compute",
      "Trajectory optimization in unknown space",
      "Infrastructure inspection and aerial survey",
    ],
    tags: ["UAS", "Planning", "Embedded ML"],
  },
  {
    id: "legged",
    number: "03",
    title: "Legged locomotion and manipulation",
    short:
      "Contact-rich control for machines that walk, climb, and manipulate in human-scale spaces.",
    body:
      "Legged systems reach terrain that wheels cannot. We work on model-based and learned controllers that reason about contact, terrain uncertainty, and whole-body dynamics of mobile manipulators, with an emphasis on robustness outside simulation.",
    image: "assets/img/research-legged.jpg",
    caption: "Quadruped on loose terrain during a stability trial",
    bullets: [
      "Whole-body control and contact planning",
      "Sim-to-real transfer for locomotion policies",
      "Mobile manipulation and grasp reasoning",
    ],
    tags: ["Legged Robots", "Control", "RL"],
  },
  {
    id: "perception",
    number: "04",
    title: "Robot perception and learning",
    short:
      "Models that turn raw sensor streams into the spatial understanding autonomy needs.",
    body:
      "Perception limits every downstream decision. We study self-supervised and semi-supervised learning for depth, semantics, and scene flow; calibration and uncertainty estimates that a planner can act on; and inference that fits inside a robot's power budget.",
    image: "assets/img/research-perception.jpg",
    caption: "Predicted depth and semantics on a cluttered indoor scene",
    bullets: [
      "Self-supervised depth and scene flow",
      "Uncertainty-aware semantic segmentation",
      "Efficient inference for embedded platforms",
    ],
    tags: ["Deep Learning", "Computer Vision", "Calibration"],
  },
  {
    id: "field",
    number: "05",
    title: "Field and marine robotics",
    short:
      "Long-duration autonomy in the terrain around San Diego: coastline, canyon, and campus.",
    body:
      "San Diego is an unusually good laboratory, with coastline, chaparral, steep terrain, and a dense robotics community nearby. We design systems for environmental monitoring, search and rescue support, and scientific data collection where communications drop out and recovery is not an option.",
    image: "assets/img/research-field.jpg",
    caption: "Coastal transect during a multi-robot field week",
    bullets: [
      "Autonomy under degraded communication",
      "Environmental sensing and mapping",
      "Failure detection and safe recovery",
    ],
    tags: ["Field Robotics", "Marine", "Autonomy"],
  },
];

/* ------------------------------------------------------------ tools --- */
/* kind: "tutorial" | "software" | "dataset" | "course" */
const TOOLS = [
  {
    kind: "software",
    title: "PRG toolchain",
    desc: "Shared estimation and calibration libraries used across the group's projects.",
    links: { github: "https://github.com/USD-PRG" },
  },
  {
    kind: "tutorial",
    title: "Probabilistic robotics primer",
    desc: "An introduction to factor graphs, filters, and uncertainty, written for new lab members.",
    links: { github: "https://github.com/USD-PRG" },
  },
  {
    kind: "dataset",
    title: "Coastal field datasets",
    desc: "Multi-sensor traversals from field campaigns, released with calibration.",
    links: { github: "https://github.com/USD-PRG" },
  },
];

/* ------------------------------------------------------ publications --- */
/* Example entry, copy and edit:
{
  title: "Paper title",
  authors: ["A. Author", "*B. Member"],   // prefix with * to highlight a member
  venue: "Conference on Robot Learning (CoRL)",
  year: 2027,
  tags: ["SLAM", "Perception"],
  links: { pdf: "https://", code: "https://", arxiv: "https://" },
  bibtex: "@inproceedings{...}"
}
*/
const PUBLICATIONS = [];

/* -------------------------------------------------------- facilities --- */
const FACILITIES = [
  { title: "Motion-capture flight arena", desc: "Instrumented space for aerial and legged experiments with ground-truth pose." },
  { title: "Mobile manipulator platforms", desc: "Wheeled and legged bases with onboard sensing and compute for field work." },
  { title: "Perception compute cluster", desc: "Local GPU cluster for training, calibration, and large-scale reconstruction." },
  { title: "Sensor and calibration bench", desc: "Lidar, camera, IMU, and event-camera rigs with time-synchronization tooling." },
];

/* ---------------------------------------------------------- teaching --- */
const COURSES = [
  {
    code: "COMP 4xx",
    title: "Introduction to Robotics",
    term: "Fall",
    body: "Kinematics, sensing, planning, and control, with a hardware final project.",
  },
  {
    code: "COMP 4xx",
    title: "Computer Vision",
    term: "Spring",
    body: "Image formation, multi-view geometry, reconstruction, and learned perception.",
  },
  {
    code: "COMP 5xx",
    title: "Robot Perception and Estimation",
    term: "Spring",
    body: "Probabilistic state estimation, SLAM, and sensor fusion for autonomous systems.",
  },
];

/* ------------------------------------------------------------- media --- */
const MEDIA = [
  {
    outlet: "USD News",
    title: "New robotics group launches in the Department of Computer Science",
    date: "November 2026",
    url: "#",
  },
];

/* --------------------------------------------------------- openings --- */
const OPENINGS = [
  {
    title: "Ph.D. and M.S. researchers",
    type: "Graduate, funded",
    body: "Two funded positions in perception, SLAM, and robot learning. Rolling review for Spring 2027.",
    apply: "apply.html",
  },
  {
    title: "Undergraduate research assistants",
    type: "Undergraduate, paid",
    body: "Paid semester assistantships, roughly 8 to 12 hours per week during term and full-time in summer.",
    apply: "apply.html",
  },
  {
    title: "Postdoctoral researcher",
    type: "Postdoc, funded",
    body: "State estimation, perception, and field autonomy.",
    apply: "apply.html",
  },
];

/* ----------------------------------------------------------- seminar --- */
const SEMINARS = [
  {
    date: "Spring 2027",
    speaker: "To be announced",
    title: "Inaugural PRG Seminar",
    abstract: "The series opens with the group's first cohort. Speakers and schedule will follow.",
  },
];

/* -------------------------------------------------------------- news --- */
const NEWS = [
  {
    date: "November 2026",
    title: "The Perception and Robotics Group is founded at USD",
    body:
      "The group is establishing a robotics lab in the Department of Computer Science, focused on perception, estimation, and autonomy for machines that operate outside the lab.",
  },
  {
    date: "November 2026",
    title: "Research assistant applications open for Spring 2027",
    body:
      "We are recruiting undergraduate and graduate researchers for perception, SLAM, and aerial autonomy projects. Applications are reviewed on a rolling basis.",
  },
];
