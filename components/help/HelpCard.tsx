import Image from "next/image";
import Link from "next/link";

const HelpCard = ({
  title,
  imageUrl,
  description,
  className = "",
}: {
  title: string;
  imageUrl: string;
  description: string;
  className?: string;
}) => {
  return (
    <Link
      href="#"
      className={`
        group relative flex flex-col w-full border border-blue-300 max-w-[90%] bg-light-shade-dark rounded-[22px] p-2.5 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.02] hover:bg-light-shade-dark/90
        cursor-pointer 
        ${className}
      `}
    >
      <div className="absolute inset-0 rounded-[22px] border border-blue-300 z-30 pointer-events-none group-hover:border-blue-400 transition-colors" />

      <div className="relative aspect-16/11 w-full overflow-hidden rounded-3xl z-10 shadow-inner">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 brightness-[0.85] group-hover:brightness-100"
          sizes="(max-width: 768px) 100vw, 360px"
        />
        <div className="absolute inset-0 bg-linear-to-t from-[#09090b]/60 via-transparent to-transparent opacity-60" />
      </div>

      <div className="relative z-20 px-4 pt-5 pb-4 flex flex-col hover:text-dark-tint-lightest">
        <h3
          className="
          text-xl md:text-3xl 
          font-seasons font-semibold tracking-tight text-light-tint-dark
          leading-[1.2] mb-2
        "
        >
          {title}
        </h3>

        <p
          className="
          text-[13px] md:text-[14px] 
          font-prompt font-light 
          text-dark-tint-lighter  leading-[1.6]
          line-clamp-2
        "
        >
          {description}
        </p>

        <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between">
          <span
            className="
             text-[11px] font-prompt font-medium uppercase tracking-widest
             text-gray-400 group-hover:text-white transition-colors duration-300
           "
          >
            View Details
          </span>

          <div
            className="
             h-7 w-7 flex items-center justify-center rounded-full 
             bg-white/3 border border-white/8
             group-hover:bg-light-tint-dark  group-hover:rotate-45
             transition-all duration-500
           "
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path
                d="M1 11L11 1M11 1H3M11 1V9"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default HelpCard;
