import React, { useState } from "react";
import { Language } from "../assets";
import { languages } from "../constants/data";
import { PiCaretDownBold, PiCaretUpBold } from "react-icons/pi";
import { useTranslation } from "react-i18next";

const Languages = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { i18n } = useTranslation();

  const handleLanguageChange = (languageCode) => {
    i18n.changeLanguage(languageCode);
    setIsOpen(false); // Close the dropdown after selecting a language
  };

  return (
    <div className="relative">
      <button
        className="flex justify-center items-center gap-1"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <img src={Language} alt="language" /> {languages.find(lang => lang.code === i18n.language)?.name || languages[0].name}
        <PiCaretUpBold
          className={`${
            isOpen ? "rotate-180" : "rotate-0"
          } transition-all duration-300`}
        />
      </button>

      <div
        className={`absolute top-10 bg-glass flex flex-col items-start rounded-lg p-2 w-[150%] ${
          isOpen ? "scale-100" : "scale-0"
        } origin-top transition-all duration-300 z-40`}
      >
        {languages.map((language, index) => (
          <div
            key={index}
            className="flex w-full justify-start gap-5 border border-transparent items-center p-4 hover:bg-glass2 cursor-pointer rounded-lg"
            onClick={() => handleLanguageChange(language.code)}
          >
            <img src={language.icon} className="w-[20px]" alt={`${language.name} icon`} />
            <p>{language.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Languages;
