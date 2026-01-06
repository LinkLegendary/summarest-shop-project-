"use client";

import { AiFillFileText, AiFillBulb, AiFillAudio } from "react-icons/ai";
import { BsStarFill, BsStarHalf } from "react-icons/bs";
import { BiCrown } from "react-icons/bi";
import { RiLeafLine } from "react-icons/ri";
import Image from "next/image";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import NavClient from "./components/NavClient";
// import { useAuth } from "./context/AuthContext";
import { useAuth } from "@/context/AuthContext";


export default function Home() {
  const { isLoggedIn, openAuthModal, authReady } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (authReady && isLoggedIn) {
      router.replace("/for-you");
    }
  }, [authReady, isLoggedIn, router]);

  // ⛔ wait for auth
  if (!authReady) return null;

  // ⏳ prevent flash
  if (isLoggedIn) {
    return <p className="text-center mt-10">Redirecting...</p>;
  }
  

  return (
    
    <div className="w-full overflow-x-hidden  ">
      <div >
         
          <NavClient />

          {/* LANDING */}
          <section id="landing">
            <div className="page-container">
              <div className="row">
                <div className="landing__wrapper">
                  <div className="landing__content">
                    <h1 className="landing__content__title">
                      Gain more knowledge <br className="remove--tablet" />
                      in less time
                    </h1>

                    <p className="landing__content__subtitle">
                      Great summaries for busy people,
                      <br className="remove--tablet" />
                      individuals who barely have time to read,
                      <br className="remove--tablet" />
                      and even people don’t like to read.
                    </p>

                    <button
                      className="btn home__cta--btn mt-6"
                      onClick={openAuthModal}
                    >
                      Login
                    </button>
                  </div>

                  <figure className="landing__image--mask">
                    <Image
                      src="/landing.png"
                      alt="landing"
                      width={600}
                      height={600}
                      priority
                    />

                    {/* <Image
                  src="/landing.png"
                  alt="landing"
                  width={120}
                  height={40}
                /> */}
                  </figure>
                </div>
              </div>
            </div>
          </section>

          {/* FEATURES */}
          <section id="features">
            <div className="page-container">
              <div className="row">
                <h2 className="section__title">
                  Understand books in few minutes
                </h2>

                <div className="features__wrapper">
                  <div className="features">
                    <div className="features__icon">
                      <AiFillFileText />
                    </div>
                    <div className="features__title">Read or listen</div>
                    <div className="features__sub--title">
                      Save time by getting the core ideas from the best books.
                    </div>
                  </div>

                  <div className="features">
                    <div className="features__icon">
                      <AiFillBulb />
                    </div>
                    <div className="features__title">Find your next read</div>
                    <div className="features__sub--title">
                      Explore book lists and personalized recommendations.
                    </div>
                  </div>

                  <div className="features">
                    <div className="features__icon">
                      <AiFillAudio />
                    </div>
                    <div className="features__title">Briefcasts</div>
                    <div className="features__sub--title">
                      Gain valuable insights from briefcasts
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* REVIEWS */}
          <section id="reviews">
            <div className="row">
              <div className="page-container">
                <h2 className="section__title">What our members say</h2>

                <div className="reviews__wrapper">
                  {["Hanna M.", "David B.", "Nathan S.", "Ryan R."].map(
                    (name, i) => (
                      <div key={i} className="review">
                        <div className="review__header">
                          <div className="review__name">{name}</div>
                          <div className="review__stars">
                            <BsStarFill />
                            <BsStarFill />
                            <BsStarFill />
                            <BsStarFill />
                            <BsStarHalf />
                          </div>
                        </div>
                        <div className="review__body">
                          This app has been a <b>game-changer</b> for me!
                        </div>
                      </div>
                    )
                  )}
                </div>

                <div className="reviews__btn--wrapper">
                  <button
                    className="btn home__cta--btn"
                    onClick={openAuthModal}
                  >
                    Login
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* NUMBERS */}
          <section id="numbers">
            <div className="page-container">
              <div className="row">
                <h2 className="section__title">
                  Start growing with Summarist now
                </h2>

                <div className="numbers__wrapper">
                  <div className="numbers">
                    <div className="numbers__icon">
                      <BiCrown />
                    </div>
                    <div className="numbers__title">3 Million</div>
                    <div className="numbers__sub--title">
                      Downloads on all platforms
                    </div>
                  </div>

                  <div className="numbers">
                    <div className="numbers__icon numbers__star--icon">
                      <BsStarFill />
                      <BsStarHalf />
                    </div>
                    <div className="numbers__title">4.5 Stars</div>
                    <div className="numbers__sub--title">
                      Average ratings on iOS and Google Play
                    </div>
                  </div>

                  <div className="numbers">
                    <div className="numbers__icon">
                      <RiLeafLine />
                    </div>
                    <div className="numbers__title">97%</div>
                    <div className="numbers__sub--title">
                      Of Summarist members create a better reading habit
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FOOTER */}
          <section id="footer">
            <div className="page-container">
              <div className="row">
                <div className="footer__top--wrapper">
                  <div className="footer__block">
                    <div className="footer__link--title">Actions</div>
                    <div className="footer__link--wrapper">
                      <a className="footer__link">Help</a>
                    </div>
                  </div>

                  <div className="footer__block">
                    <div className="footer__link--title">Company</div>
                    <div className="footer__link--wrapper">
                      <a className="footer__link">About</a>
                    </div>
                  </div>

                  <div className="footer__block">
                    <div className="footer__link--title">Legal</div>
                    <div className="footer__link--wrapper">
                      <a className="footer__link">Privacy Policy</a>
                    </div>
                  </div>
                </div>

                <div className="footer__copyright--wrapper">
                  <div className="footer__copyright">© 2023 Summarist.</div>
                </div>
              </div>
            </div>
          </section>
        
      

      </div>
       
     
    </div>
  );
}















// "use client";

// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { useAuth } from "@/context/AuthContext";

// export default function Home() {
//   const { isLoggedIn, authReady, openAuthModal } = useAuth();
//   const router = useRouter();

//   // ✅ redirect AFTER render
//   useEffect(() => {
//     if (authReady && isLoggedIn) {
//       router.replace("/for-you");
//     }
//   }, [authReady, isLoggedIn, router]);

//   // ⛔ wait for auth
//   if (!authReady) return null;

//   // ⏳ prevent flash
//   if (isLoggedIn) {
//     return <p className="text-center mt-10">Redirecting...</p>;
//   }


//   return (
//     <div className="text-center mt-20">
     
//         <>
//           <h1 className="text-3xl font-bold mt-9">Welcome to Mini Project</h1>
//           <button
//             onClick={openAuthModal}
//             className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
//           >
//             Login with Google
//           </button>
//         </>
      
//     </div>
//   );
// }






// "use client";

// import { useAuth } from "../context/AuthContext";
// import ForYouPage from "./for-you/page";

// export default function Home() {
//   const { isLoggedIn, openAuthModal } = useAuth();

//   return (
//     <div className="text-center mt-20">
//       {!isLoggedIn ? (
//         <>
//           <h1 className="text-3xl font-bold mt-9">Welcome to Mini Project</h1>
//           <button
//             onClick={openAuthModal}
//             className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
//           >
//             Login with Google
//           </button>
//         </>
//       ) : (
//         <div>
//           <h1 className="text-3xl text-red-600 font-bold mb-24">You are logged in!</h1>
//           <ForYouPage  />
//         </div>
        
//       )}
//     </div>
//   );
// }