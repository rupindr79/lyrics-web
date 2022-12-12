import { useEffect, useState } from "react";
import axios from "axios";
import type { NextPage } from "next";
import Head from "next/head";
import Music from 'assets/music.jpg';
import Image from "next/image";
import { resolve } from "path";
import Link from "next/link";


const SingleCategory: NextPage = () => {
    const [data, setdata] = useState([]);
    const getData = async () => {
        try {
            const res = await axios({
                method: "GET",
                url: `https://www.alldesilyrics.com/wp-json/wp/v2/tags`,
            });
            if (res && res.data) {
                setdata(res.data);
            }
            console.log("categories+++++", res.data);       
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getData();
    }, []);
    return (
        <>
            <Head>
                <title>All Songs Lyrics</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {/*  */}
            <div className="mt-10 px-8">
						<div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {data.map((value: any) => {
                        return (
                            <div key={value.title} className="pt-6">
                                <div className="flow-root bg-light rounded-lg px-4 pb-8">
                                    <div className="-mt-6">
                                        <div className="flex items-center justify-center">
                                            <span className="p-2">                                               
                                            <Image src={Music} alt='music' className="rounded w-9/12 m-auto"/>
                                            {/* <img src={[value]_embedded['wp:featuredmedia']['0'].source_url} alt="song"/> */}
                                            </span>
                                        </div>
                                        <div className="text-center justify-center items-center">

                                        <Link href={`/categories/${value.link}`}>
                                            <h3 className="mt-4 text-lg font-bold w-full break-words overflow-x-auto text-primary tracking-tight">
                                            {value.name}

                                            </h3>                                                                             
                                            </Link>                      
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
						</div>
					</div>      
        </>
    );
};

export default SingleCategory;