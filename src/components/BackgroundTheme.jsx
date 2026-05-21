/**
 * @copyright 2025 ibkobi
 * @license Apache-2.0
 */

import { useEffect, useRef } from "react";

export default function BackgroundTheme() {
    return (
        <div
            className="fixed top-0 left-0 w-[100vw] h-[100vh] -z-10 pointer-events-none bg-[#faf9f6] dark:bg-slate-900 transition-colors duration-500"
        />
    );
}
