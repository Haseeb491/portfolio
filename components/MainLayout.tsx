import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import SideNavigation from "./SideNavigation";
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { PlusIcon } from "@radix-ui/react-icons";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default async function MainLayout({ children }: MainLayoutProps) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const signOut = async () => {
    "use server";

    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    await supabase.auth.signOut();
    return redirect("/login");
  };

  if (!user) {
    return redirect('/login');
  }

  return (
    <main className="flex" >
      <SideNavigation />
      <section className="w-8/12 py-4 px-6" >
        <header className="p-4 border-b " >
          <div className="container flex justify-between ">
            <div className="">

            </div>
            <div className="flex gap-6 justify-between">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant='ghost' > <PlusIcon className="mr-2" />  create </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" >
                  <Link href={"admin/projects/create"} >
                    <DropdownMenuItem className=" text-gray-500 hover:bg-gray-300 rounded" >
                      Project
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuSeparator />
                  <Link href={"/admin/blogs/create"}>
                    <DropdownMenuItem className=" text-gray-500 hover:bg-gray-300 rounded" >
                      Blog
                    </DropdownMenuItem>
                  </Link>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>{user?.email && user.email[0]}</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" >
                  <DropdownMenuItem className="hover:bg-gray-300 rounded" >
                    {user.email}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="hover:bg-gray-300 rounded" >
                    Log out
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>
        <div className="px-5 py-2">
          {children}
        </div>
      </section>
    </main>

  )

  // return user ? (
  //   <div className="flex items-center gap-4">
  //     Hey, {user.email}!
  //     <form action={signOut}>
  //       <button className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
  //         Logout
  //       </button>
  //     </form>
  //   </div>
  // ) : (
  //   <Link
  //     href="/login"
  //     className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
  //   >
  //     Login
  //   </Link>
  // );
}
