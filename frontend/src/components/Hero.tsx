function Hero() {
  return (
    <section id="home" className="bg-primary pt-10 pb-10 lg:pt-16 lg:pb-16">
      <div className="container lg:max-w-[1305px] lg:px-10">
        <div className="w-full px-4 flex flex-col items-center justify-center">
          <Image
            src="/images/nouns/hat.png"
            width={100}
            height={100}
            alt="hero"
          />
          <h1 className="mb-6 text-4xl font-bold  text-center leading-tight text-black sm:text-[40px] md:text-[50px] lg:text-[42px] xl:text-[50px]">
            <span className="bg-yellow-gradient-color bg-clip-text tracking-widest mx-2">
              <span className="text-yellow-300 ">S</span>uper{" "}
              <span className="text-yellow-300 ">W</span>e{" "}
              <span className="text-yellow-300 ">A</span>ll{" "}
            </span>{" "}
            <span className="text-yellow-300 ">G</span>onna{" "}
            <span className="text-yellow-300 ">G</span>ive{" "}
            <span className="text-yellow-300 ">I</span>t
          </h1>
          <p className="text-3xl text-center mb-10 max-w-[700px] leading-relaxed text-body">
            Swaggy ensures your event makes a positive impact by saving swag and
            food for local charities. <br /> Don&apos;t waste, be the best
          </p>

          <div className="flex gap-20 justify-between">
            <YellowSun />

            <Link
              target="_blank"
              href="https://github.com/akugone/londoneth"
              className=" inline-flex h-[60px] items-center rounded-lg bg-black py-[14px] px-[30px] text-white hover:bg-opacity-90"
            >
              <span className="mr-[18px] border-r border-stroke border-opacity-40 pr-[18px] leading-relaxed ">
                Github
              </span>
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#FFF"
                    d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                  />
                </svg>
              </span>
            </Link>

            <YellowSun />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
