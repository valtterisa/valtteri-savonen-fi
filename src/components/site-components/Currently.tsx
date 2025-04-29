export function Currently() {
  return (
    <section
      id="currently"
      className="section h-dvh flex items-center py-16 md:py-24"
    >
      <div className="w-full px-4 sm:px-8 md:px-16">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-center uppercase text-3xl sm:text-4xl md:text-6xl pt-6 md:pt-0 font-bold mb-6 sm:mb-10 md:mb-16 uppercase tracking-wide">
            Currently
          </h2>

          <div className="space-y-10">
            <div>
              <h3 className="font-medium text-xl mb-4">Tech</h3>
              <ul className="list-disc pl-5 space-y-4">
                <li className="pl-2">
                  <p className="text-base sm:text-lg md:text-xl text-gray-300">
                    Co-founder of software agency.{" "}
                    <a
                      className="text-gray-300 underline"
                      href="https://bittive.com"
                    >
                      Bittive LLC
                    </a>
                  </p>
                </li>
                <li className="pl-2">
                  <p className="text-base sm:text-lg md:text-xl text-gray-300">
                    Building a new product that makes Wordpress obsolete. Coming
                    soon.
                  </p>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium text-xl mb-4">Other</h3>
              <ul className="list-disc pl-5 space-y-4">
                <li className="pl-2">
                  <p className="text-base sm:text-lg md:text-xl text-gray-300">
                    Reading books to educate myself.
                  </p>
                </li>
                <li className="pl-2">
                  <p className="text-base sm:text-lg md:text-xl text-gray-300">
                    Co-founder of pre-loved luxury clothing and accessories
                    brand. <br />
                    <a
                      className="text-gray-300 underline"
                      href="https://www.instagram.com/luxmarketfin/"
                    >
                      Luxmarketfin Clothing & Accessories LLC
                    </a>
                  </p>
                </li>
                <li className="pl-2">
                  <p className="text-base sm:text-lg md:text-xl text-gray-300">
                    Playing CS with friends.
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
