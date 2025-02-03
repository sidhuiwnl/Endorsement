/** @type {import('next').NextConfig} */
const nextConfig = {
    images : {
        remotePatterns : [
            {
                protocol  :"https",
                hostname : "assets.aceternity.com"
            },{
                protocol : "https",
                hostname : "pbs.twimg.com"
            },{
                protocol : "https",
                hostname : "avatars.githubusercontent.com"
            },{
            protocol : "https",
                hostname : "utfs.io"
            }
        ]
    },
    async redirects(){
        return[
            {
                source: '/dashboard',
                destination: '/dashboard/reviews',
                permanent: false, // Set to true if it's a permanent redirect
            }
        ]
    }
};

export default nextConfig;
