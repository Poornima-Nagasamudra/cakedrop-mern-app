import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-pink-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-3xl bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-4xl font-bold text-pink-600 mb-4 text-center">
          About Us
        </h2>

        <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          {" "}
          Welcome To CakeZone
        </h3>

        <p className="text-gray-700 text-lg leading-relaxed mb-4">
          Baked goods have been around for thousands of years. The art of baking
          was very popular during the Roman Empire. It was highly famous art as
          Roman citizens loved baked goods and demanded them frequently for
          important occasions such as feasts and weddings.
        </p>
        <p className="text-gray-700 text-lg leading-relaxed mb-4">
          Because of the fame of the art of baking, around 300 BC, baking was
          introduced as an occupation and respectable profession for Romans.
          Bakers began to prepare bread at home in an oven, using grist mills to
          grind grain into flour for their breads. The demand for baked goods
          persisted, and the first bakers' guild was established in 168 BC in
          Rome.
        </p>

        <p className="text-gray-700 text-lg leading-relaxed mb-6">
          The desire for baked goods promoted baking throughout Europe and
          expanded into eastern parts of Asia. Bakers started baking bread and
          other goods at home and selling them on the streets.
        </p>
        <p className="text-pink-700 font-medium text-lg text-center">
          Learn more about our bakery and our passion for making delicious
          cakes.
        </p>
      </div>
    </div>
  );
};

export default About;
