const Footer = () => {
  return (
    <footer className=" bg-gray-900 text-white">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:px-8 px-5 py-9">
        <div>
          <h1 className="mb-1 font-semibold">About Code</h1>
          <li>
            <a
              className="text-gray-400 hover:text-teal-400 duration-300 text-sm cursor-pointer leading-6"
              href="#"
            >
              source code
            </a>
          </li>
        </div>
        <div>
          <h1 className="mb-1 font-semibold">About Us</h1>
          <li>
            <a
              className="text-gray-400 hover:text-teal-400 duration-300 text-sm cursor-pointer leading-6"
              href="#"
            >
              Github(Abiru)
            </a>
          </li>
          <li>
            <a
              className="text-gray-400 hover:text-teal-400 duration-300 text-sm cursor-pointer leading-6"
              href="#"
            >
              Github(Higashitani)
            </a>
          </li>
          <li>
            <a
              className="text-gray-400 hover:text-teal-400 duration-300 text-sm cursor-pointer leading-6"
              href="#"
            >
              Wantedly(Abiru)
            </a>
          </li>
          <li>
            <a
              className="text-gray-400 hover:text-teal-400 duration-300 text-sm cursor-pointer leading-6"
              href="#"
            >
              Wantedly(Higashitani)
            </a>
          </li>
        </div>
      </div>
      <div className="text-gray-400 text-sm pb-6 px-8">
        <span>© hoge</span>
      </div>
    </footer>
  );
};

export default Footer;
