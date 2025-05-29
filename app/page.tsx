import { RetroTerminal } from '@/components/terminal/RetroTerminal';
import TextBlock from '../components/TextBlock';
import { Conway } from '@/components/ConwayGameOfLife';
import { PolaroidCard } from '@/components/PolaroidCard';
import Image from 'next/image';
import { teamMembers } from '@/data/team-members';
import DecryptedText from '@/components/DecryptedText';
import CanvasContainer from '@/components/3D/CanvasContainer';

export default function Home() {
  return (
    <div className="relative overflow-x-hidden">
      <img
        alt=""
        className="-z-10 fixed left-0 top-0 w-screen h-screen opacity-10"
        src="/noise.webp"
      ></img>
      <div className="fixed left-0 top-0 w-screen h-screen">
        <Conway />
      </div>
      <main className="relative z-20 pointer-events-none">
        <div className="absolute w-screen h-screen z-10 left-0 -top-[100px] md:-top-[220px] pointer-events-none">
          <CanvasContainer />
        </div>
        <div className="mx-auto z-30 relative max-w-[720px] flex justify-end md:justify-start font-[family-name:var(--font-geist-sans)] pointer-events-none pt-10 md:pt-[140px]">
          <TextBlock
            hasBackdrop={true}
            className="md:max-w-[300px] md:translate-x-[120px] translate-y-10 md:mx-auto pointer-events-none select-none"
            textNodes={["Infinite is a student-run magazine seeking to reframe art, politics, culture, and aesthetics through the lens of fashion."]}
          />
        </div>
        <div className="pointer-events-none pt-10">
          <RetroTerminal />
          <TextBlock
            className="md:max-w-[500px] mx-auto mt-10 md:mt-0 pointer-events-none select-none"
            textNodes={["Each issue features full-page photo spreads and articles that are unified under the current issue's theme.", "Infinite aims to provide the space, resources, and platform for student designers and writers to showcase their projects and experiments to the MIT community and beyond."
            ]
            }
          />
        </div>
        <div className="">
          <div className="xl:mt-0 md:py-0 overflow-hidden pointer-events-auto mt-10 mb-44">
            <div className="xl:h-[1400px] xl:w-[1400px] relative mx-auto">
              <div className="flex pb-[198px] xl:pb-0 xl:grid flex-wrap pt-32 xl:pt-10 xl:grid-cols-4 xl:p-10 z-20 gap-12 xl:my-20 xl:translate-y-20 relative items-center justify-center">
                {teamMembers.map((member) => (
                  member === "blank" ? (
                    <div key={member} className="w-full h-full"></div>
                  ) : (
                    <PolaroidCard
                      key={member.name}
                      className={member.className}
                      initialBox={member.initialBox}
                      initialRotation={member.initialRotation}
                      tapeStyle={member.tapeStyle}
                      member={member}
                    />
                  )
                ))}
              </div>
              <div
                className="absolute ml-6 xl:ml-0 xl:pl-0 block z-10 w-full rounded-[25px] h-full left-0 top-0 opacity-30"
                style={{
                  backgroundImage: 'url(/mat-noise.webp)',
                  backgroundRepeat: 'repeat',
                  backgroundSize: '200px 200px'
                }}
              />
              <div className="xl:hidden  absolute pl-6 w-full left-0 top-0 h-full">
                <div className="h-full relative bg-[#B33D3D] pt-6 pb-[150px] rounded-l-[20px]">
                  <div className="ml-6 h-[100px] w-[251px] p-2 pr-10 rounded-none leading-none flex items-center p-4 text-2xl border-2 border-white  absolute bg-[#B33D3D] font-bold uppercase text-white ">Team<br />Members</div>

                  <div
                    className="h-full ml-6 w-full"
                    style={{
                      backgroundImage: `linear-gradient(to right, white 1px, transparent 1px),
                        linear-gradient(to bottom, white 1px, transparent 1px)`,
                      backgroundSize: '50px 50px'
                    }}
                  />
                  <div className="ml-6 h-[100px] p-2 pr-10 rounded-none leading-none flex items-center p-4 text-lg border-2 border-white  bottom-0 bg-[#B33D3D] font-bold uppercase text-white ">infinite-mag.mit.edu</div>
                </div>
              </div>
              <Image fill alt="absolute" src="/mat.webp" className="absolute hidden xl:block overflow-hidden w-full h-full left-0 top-0" />
            </div>
          </div>
        </div>
      </main>
      <footer className="flex absolute bottom-0 left-0 w-full justify-center z-10  pointer-events-auto min-h-[300px] items-end pb-4 md:pb-12">
        <ul className=" flex-col md:flex-row items-center rounded-[15px] bg-[#F2F1EB]/30 backdrop-blur-[1px] text-base font-mono font-medium p-4 px-6 relative z-10 flex justify-between md:gap-10 gap-4">
          <li><a href="https://www.instagram.com/infinite.mag" className="relative z-10" target="_blank" style={{ textShadow: '0 0 1px rgba(0,0,0,0.1)' }}><DecryptedText text="Instagram" animateOn={['view', 'hover']} /></a></li>
          <li><a href="mailto:todo" className="relative z-10" target="_blank" style={{ textShadow: '0 0 1px rgba(0,0,0,0.1)' }}><DecryptedText text="Email" animateOn={['view', 'hover']} /></a></li>
          <li><a href="TODO:" className="relative z-10" target="_blank" style={{ textShadow: '0 0 1px rgba(0,0,0,0.1)' }}><DecryptedText text="Twitter" animateOn={['view', 'hover']} /></a></li>
        </ul>
      </footer>
    </div>
  );
}
