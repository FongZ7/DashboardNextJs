"use client"


import React, { useState, useEffect} from 'react'
import AdminNav from './component/AdminNav'
import Container from './component/Container'
import Footer from './component/Footer'
import SideNav from './component/SideNav'
import Content from './component/Content'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'


function AdminPage() {

    const { data: session } = useSession();
    if (!session) redirect("/login");
    if (!session?.user?.role === "admin") redirect("/welcome");

    const [totalUsersData, setTotalUsersData] = useState([]);
    const [totalPostsData, setTotalPostsData] = useState([]);
    
    console.log(totalUsersData)
    console.log(totalPostsData)

    const getTotalUsers = async () => {
      try{

        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/totalusers`, {
          cache: "no-store"
        })

        if(!res.ok) {
          throw new Error("Failed to fetch user");
        }

        const data = await res.json();
        setTotalUsersData(data.totalUsersData);

      } catch(error) {
        console.log("Error loading users:", error);
      }
  }

  const getTotalPosts = async () => {
    try{

      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/totalposts`, {
        cache: "no-store"
      })

      if(!res.ok) {
        throw new Error("Failed to fetch posts");
      }

      const data = await res.json();
      setTotalPostsData(data.totalPostsData);

    } catch(error) {
      console.log("Error loading posts:", error);
    }
}

  useEffect(() => {
      getTotalUsers();
      getTotalPosts();
  }, [])

  return (
    <Container>
        <AdminNav  session={session} />
        <div className='flex-grow'>
            <div className='container mx-auto'>
                <div className='flex justify-between mt-10'>
                    <SideNav />
                    <Content  totalUsersData={totalUsersData} totalPostsData={totalPostsData}/>
                </div>
            </div>
        </div>
        <Footer />
    </Container>
  )
}

export default AdminPage
