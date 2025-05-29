import Image from 'next/image';

interface InfiniteLogoProps {
    className?: string;
    size?: number;
}

export const InfiniteLogo = ({ className, size = 400 }: InfiniteLogoProps) => {
    return (
        <div
            className={`${className}`}
        >
            <Image
                src="/logo.png"
                alt="infinite"
                width={size}
                height={size}
            />
            <div className="absolute w-[104%] h-[104%] -left-[2px] top-[-2%] blur-[3px]">
                <Image
                    src="/logo.png"
                    alt="infinite"
                    width={size}
                    height={size}
                />
            </div>
            <div className="absolute w-[104%] h-[104%] -left-[2px] top-[0%] blur-[3px]">
                <Image
                    src="/logo.png"
                    alt="infinite"
                    width={size}
                    height={size}
                />
            </div>
        </div>
    );
};