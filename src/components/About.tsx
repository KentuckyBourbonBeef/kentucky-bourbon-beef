const About = () => {
  return (
    <section className="py-20">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6">Our Kentucky Heritage</h2>
            <p className="text-lg mb-6 text-gray-700">
              For generations, Kentucky has been home to two great traditions: exceptional bourbon and premium beef. At Kentucky Bourbon Beef, we've united these traditions to create something extraordinary.
            </p>
            <p className="text-lg text-gray-700">
              Our unique finishing process with Bourbon Grains, developed in partnership with master distillers and expert butchers, brings out subtle bourbon-inspired flavors in every cut while supporting sustainable farming practices. This artisanal approach not only creates exceptionally tender beef but also helps reduce waste in Kentucky's bourbon industry.
            </p>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1590534247854-e97d5e3feef6"
              alt="Kentucky Bourbon Barrels"
              className="rounded-lg shadow-xl"
            />
            <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-bourbon-100 rounded-lg -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;