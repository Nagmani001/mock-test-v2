import { filteredTest, searchAtom, testAtom } from "@/atom/atom";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { useAtom, useAtomValue } from "jotai";

export default function Nav() {
  const [search, setSearch] = useAtom(searchAtom);
  const tests = useAtomValue(testAtom);
  const [filter, setFilterAtom] = useAtom(filteredTest);
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img
              src="https://nocache-appxdb.classx.co.in/subject/2024-04-17-0.6081054101920533.jpg"
              alt="Guidely Logo"
              className="h-[50px]"
              height="50"
            />
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                onClick={() => {
                  window.scrollTo({
                    top: 1500
                  })
                }}
                onChange={(e) => {
                  setSearch(e.target.value)
                  const newArr = tests.filter(x => x.title.includes(search));
                  //@ts-ignore
                  setFilterAtom(newArr);
                  console.log(filter);

                }}
                value={search}
                type="search"
                id="default-search"
                className="block w-full pl-10 pr-20 py-2.5 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Search for tests, courses..."
                required
              />
            </div>
          </div>

          {/* User Actions */}
          <div className="flex items-center gap-4">
            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <div className="rounded-lg px-4 py-2 border border-gray-300 hover:bg-gray-50 cursor-pointer transition-colors">
                <SignInButton />
              </div>
            </SignedOut>
          </div>
        </div>
      </div>
    </div>
  );
}
