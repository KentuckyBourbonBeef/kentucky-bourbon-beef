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
              Our artisanal approach combines Kentucky's rich heritage of craftsmanship with our unique Bourbon Grains finishing process. Developed in partnership with master distillers and expert butchers, this process infuses our beef with subtle bourbon-inspired flavors, creating a one-of-a-kind culinary experience that celebrates the traditions of both Kentucky bourbon and premium beef.
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