import { Marquee } from "./marquee";

const teamMembers = [
  {
    image: "/image/Team/Ashutosh.png",
    name: "Ashutosh",
    role: "Founder & CEO",
  },
  {
    image: "/image/Team/Siddhi.jpg",
    name: "Siddhi",
    role: "Cofounder & Finance Head",
  },
  {
    image: "/image/Team/Sarthak.jpg",
    name: "Sarthak",
    role: "Cofounder & Tech Head",
  },
  {
    image: "/image/Team/Prathamesh.png",
    name: "Prathamesh",
    role: "Cofounder & AIML/Networking Head",
  },
  {
    image: "/image/Team/Shaurya.jpg",
    name: "Shaurya",
    role: "Cofounder & Application Head",
  },
];

export default function TeamPage() {
  return (
    <section className="relative w-full overflow-hidden bg-slate-950 py-12 md:py-24 text-white">
      <div>
        <svg
          className="absolute right-0 bottom-0 text-neutral-800 opacity-20"
          fill="none"
          height="154"
          viewBox="0 0 460 154"
          width="460"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_494_1104)">
            <path
              d="M-87.463 458.432C-102.118 348.092 -77.3418 238.841 -15.0744 188.274C57.4129 129.408 180.708 150.071 351.748 341.128C278.246 -374.233 633.954 380.602 548.123 42.7707"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="40"
            />
          </g>
          <defs>
            <clipPath id="clip0_494_1104">
              <rect fill="white" height="154" width="460" />
            </clipPath>
          </defs>
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mx-auto mb-16 flex max-w-5xl flex-col items-center px-6 text-center lg:px-0">
          <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white">
           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user-star"><path d="M16.051 12.616a1 1 0 0 1 1.909.024l.737 1.452a1 1 0 0 0 .737.535l1.634.256a1 1 0 0 1 .588 1.806l-1.172 1.168a1 1 0 0 0-.282.866l.259 1.613a1 1 0 0 1-1.541 1.134l-1.465-.75a1 1 0 0 0-.912 0l-1.465.75a1 1 0 0 1-1.539-1.133l.258-1.613a1 1 0 0 0-.282-.866l-1.156-1.153a1 1 0 0 1 .572-1.822l1.633-.256a1 1 0 0 0 .737-.535z"/><path d="M8 15H7a4 4 0 0 0-4 4v2"/><circle cx="10" cy="7" r="4"/></svg>
          </div>

          <h1 className="relative mb-4 font-medium text-4xl text-neutral-100 tracking-tight sm:text-5xl">
            Meet the Founders
            <svg
              className="absolute -top-2 -right-8 -z-10 w-24 text-neutral-700"
              fill="currentColor"
              height="86"
              viewBox="0 0 108 86"
              width="108"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M38.8484 16.236L15 43.5793L78.2688 15L18.1218 71L93 34.1172L70.2047 65.2739"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="28"
              />
            </svg>
          </h1>
          <p className="max-w-2xl text-neutral-400">
            A team of innovators, engineers, and designers building the Unified Money OS for the modern Indian user.
          </p>
        </div>

        <div className="relative w-full">
          <div className="pointer-events-none absolute top-0 left-0 z-10 h-full w-32 bg-gradient-to-r from-slate-950 to-transparent" />
          <div className="pointer-events-none absolute top-0 right-0 z-10 h-full w-32 bg-gradient-to-l from-slate-950 to-transparent" />

          <Marquee className="[--gap:1.5rem]" pauseOnHover>
            {teamMembers.map((member) => (
              <div
                className="group flex w-64 shrink-0 flex-col px-2"
                key={member.name}
              >
                <div className="relative h-80 w-full overflow-hidden rounded-2xl bg-neutral-800">
                  <img
                    alt={member.name}
                    className="absolute inset-0 h-full w-full object-cover grayscale transition-all duration-300 hover:grayscale-0"
                    src={member.image}
                  />
                  <div className="absolute bottom-2 inset-x-2 rounded-lg bg-neutral-800/80 p-3 backdrop-blur-sm border border-white/5">
                    <h3 className="font-semibold text-neutral-100">
                      {member.name}
                    </h3>
                    <p className="text-neutral-400 text-sm">
                      {member.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </Marquee>
        </div>

        <div className="mx-auto mt-20 max-w-3xl px-6 text-center lg:px-0">
          <p className="mb-8 font-medium text-lg text-neutral-200 leading-relaxed md:text-xl italic">
            "We are not just building another payment app. We are crafting a Unified Money OS designed to give every Indian complete mastery and automated intelligence over their financial life."
          </p>
          <div className="text-center">
            <p className="font-semibold text-indigo-400">
              The TrackPay Team
            </p>
            <p className="text-neutral-500 text-sm">
              IIT Madras Nirmaan Pre-Incubated Startup
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
