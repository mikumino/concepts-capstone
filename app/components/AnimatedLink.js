import { motion } from 'framer-motion';
import Link from 'next/link';

export default function AnimatedLink({ href, children, active }) {
    const variants = {
        hidden: { opacity: 0, transform: 'scaleX(0)' },
        visible: { opacity: 1, transform: 'scaleX(1)'},
    };
    
    return (
    <Link href={href} className='btn btn-ghost relative'>
        {children}
        {active && (
            <motion.div
            initial="hidden"
            animate="visible"
            variants={variants}
            transition={{ duration: 0.25 }}
            className="absolute bottom-0 w-[25px] h-1 rounded-2xl bg-base-content"
            />
        )}
    </Link>
    );
}