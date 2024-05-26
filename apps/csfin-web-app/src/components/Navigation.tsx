import { NavigationLink } from "./NavigationLink";

export const Navigation = () => {
  return (
<<<<<<< HEAD
    <nav className="text-white bg-black flex justify-between items-stretch sticky top-0 px-4 h-[var(--navbar-height)]">
=======
    <nav className="text-white bg-black flex justify-between items-stretch sticky top-0 px-4">
>>>>>>> d124524 (feat: add simple navigation)
      <span className="text-3xl font-black py-2">{"{csfin}"}</span>

      <ul className="p-0 m-0 list-none flex">
        <li>
          <NavigationLink to="/securities">Securities</NavigationLink>
        </li>
        <li>
          <NavigationLink to="/exchanges">Exchanges</NavigationLink>
        </li>
        <li>
          <NavigationLink to="/securities/evaluate">Evaluation</NavigationLink>
        </li>
      </ul>
    </nav>
  );
};
