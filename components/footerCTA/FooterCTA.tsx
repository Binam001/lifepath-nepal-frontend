const FooterCTA = () => {
  return (
    <>
      <section
        className="relative h-screen w-full bg-cover bg-center"
        style={{ backgroundImage: "url('/cta-image.png')" }}
      >
        <div className="relative z-10 mx-auto pb-8 flex h-full max-w-6xl flex-col justify-end text-white">
          <h2 className="text-4xl font-bold md:text-9xl">
            Let&apos;s Build Together
          </h2>
        </div>
        <div
          className="absolute inset-0"
          style={{ backgroundImage: "url(/grainy.png)" }}
        ></div>
      </section>
    </>
  );
};

export default FooterCTA;
