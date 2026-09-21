import { useTranslation } from "react-i18next";

const languages = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिंदी" }
  // future:
  // { code: "or", label: "ଓଡ଼ିଆ" },
  // { code: "bn", label: "বাংলা" }
];

const LanguageDropdown = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (e) => {
    const lang = e.target.value;
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
  };

  return (
    <select
      value={i18n.language}
      onChange={changeLanguage}
      className="border rounded-md px-3 py-1 text-lg bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
    >
      {languages.map((lang) => (
        <option key={lang.code} value={lang.code}>
          {lang.label}
        </option>
      ))}
    </select>
  );
};

export default LanguageDropdown;
