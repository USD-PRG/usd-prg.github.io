/* =========================================================================
   USD Perception & Robotics Group — site content
   -------------------------------------------------------------------------
   This is the only file you need to edit to update the site.
   Everything below is plain JavaScript. Add / remove entries, commit, done.
   ========================================================================= */

/* -------------------------------------------------------------- site --- */
const SITE = {
  name: "Perception & Robotics Group",
  shortName: "USD PRG",
  university: "University of San Diego",
  department: "Department of Computer Science",
  // Change this to the address that should receive applications.
  email: "prg@sandiego.edu",
  linkedin: "https://www.linkedin.com/company/usd-prg",
  github: "https://github.com/USD-PRG",
};

/* ------------------------------------------------------------ people --- */
/* `group` accepts: "faculty" | "postdoc" | "phd" | "masters" | "undergrad" | "alumni"
   `avatar` is optional — a URL to a photo. Without one, initials are used.
   Example:
   {
     name: "Jane Doe",
     role: "Ph.D. Student",
     group: "phd",
     focus: "Semantic SLAM for field robots",
     avatar: "assets/img/people/jane.jpg",
     links: { email: "jdoe@sandiego.edu", github: "https://github.com/jdoe",
              scholar: "https://scholar.google.com/", linkedin: "https://linkedin.com/in/jdoe" }
   },
*/

const PEOPLE = [];

/* Roles we are actively looking to fill. These render as "open" cards. */
const OPEN_ROLES = [
  {
    role: "Faculty Director",
    note: "Founding director appointment in progress.",
  },
  {
    role: "Ph.D. & M.S. Researchers",
    note: "Two funded positions in perception and robot learning.",
  },
  {
    role: "Undergraduate Research Assistants",
    note: "Paid semester research assistantships for USD undergraduates.",
  },
];

/* ---------------------------------------------------------- research --- */
const RESEARCH = [
  {
    id: "slam",
    number: "01",
    title: "SLAM & 3D Reconstruction",
    short:
      "Robust localization and dense mapping for robots operating in unstructured, GPS-denied environments.",
    body:
      "We develop estimation pipelines that fuse lidar, vision, inertial, and leg-odometry data into a single metric-consistent map. Our work targets long-duration autonomy: loop closure that survives perceptual aliasing, map representations that stay compact over kilometres of traversal, and reconstructions that are dense enough to plan against.",
    image: "assets/img/research-slam.jpg",
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
    title: "Aerial Robotics",
    short:
      "Agile flight, onboard perception, and long-horizon autonomy for small uninhabited aerial systems.",
    body:
      "Aerial platforms are our fastest-moving testbed. We study compute-aware perception stacks that run entirely onboard, aggressive trajectory generation in cluttered space, and aerial inspection behaviours that stay safe when the map is wrong. Field deployments keep us honest about wind, dust, and battery.",
    image: "assets/img/research-aerial.jpg",
    bullets: [
      "Onboard perception on embedded compute",
      "Trajectory optimization in unknown space",
      "Infrastructure inspection and aerial surveying",
    ],
    tags: ["UAS", "Planning", "Embedded ML"],
  },
  {
    id: "legged",
    number: "03",
    title: "Legged Locomotion & Manipulation",
    short:
      "Contact-rich control for machines that walk, climb, and manipulate in human-scale spaces.",
    body:
      "Legged systems can go where wheels cannot. We work on model-based and learned controllers that reason about contact, terrain uncertainty, and the whole-body dynamics of mobile manipulators — with an emphasis on robustness to the messy real world rather than the clean simulation.",
    image: "assets/img/research-legged.jpg",
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
    title: "Robot Perception & Learning",
    short:
      "Deep models that turn raw sensor streams into the spatial understanding autonomy actually needs.",
    body:
      "Perception is the bottleneck for every downstream decision. We study self-supervised and semi-supervised learning for depth, semantics, and scene flow; calibration and uncertainty estimation that downstream planners can trust; and efficient inference that fits inside a robot's power budget.",
    image: "assets/img/research-perception.jpg",
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
    title: "Field & Marine Robotics",
    short:
      "Long-duration autonomy in the environments around San Diego — coast, canyon, and campus.",
    body:
      "San Diego is an unusually good laboratory: coastline, chaparral, steep terrain, and one of the densest robotics communities in the country. We design systems for environmental monitoring, search and rescue support, and scientific data collection where comms drop out and recovery is not an option.",
    image: "assets/img/research-field.jpg",
    bullets: [
      "Communication-degraded autonomy",
      "Environmental sensing and mapping",
      "Failure detection and safe recovery",
    ],
    tags: ["Field Robotics", "Marine", "Autonomy"],
  },
];

/* ------------------------------------------------------ publications --- */
/* Example entry — copy, uncomment, and edit:
{
  title: "Paper title goes here",
  authors: ["A. Author", "B. Author", "C. Author"],
  venue: "Conference on Robot Learning (CoRL)",
  venueShort: "CoRL",
  year: 2027,
  tags: ["SLAM", "Perception"],
  links: { pdf: "https://...", code: "https://github.com/...", arxiv: "https://arxiv.org/abs/..." },
  bibtex: "@inproceedings{...}"
}
*/

const PUBLICATIONS = [];

/* -------------------------------------------------------------- news --- */
const NEWS = [
  {
    date: "November 2026",
    title: "The Perception & Robotics Group is founded at USD",
    body:
      "Our group is establishing a robotics research lab in the Department of Computer Science, focused on perception, estimation, and autonomy for machines that operate outside the lab.",
  },
  {
    date: "November 2026",
    title: "Spring 2027 research assistant applications are open",
    body:
      "We are recruiting undergraduate and graduate researchers for perception, SLAM, and aerial autonomy projects. Applications are reviewed on a rolling basis.",
  },
];

/* ----------------------------------------------------------- courses --- */
const COURSES = [
  {
    code: "COMP 4xx",
    title: "Introduction to Robotics",
    body: "Kinematics, sensing, planning, and control — with a hardware-heavy final project.",
  },
  {
    code: "COMP 4xx",
    title: "Computer Vision",
    body: "Geometry, image formation, multi-view reconstruction, and modern learned perception.",
  },
  {
    code: "COMP 5xx",
    title: "Robot Perception & Estimation",
    body: "Probabilistic state estimation, SLAM, and sensor fusion for autonomous systems.",
  },
];
