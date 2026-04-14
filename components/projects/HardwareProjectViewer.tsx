'use client'

interface HardwareProjectViewerProps {
  modelPath: string
  sections?: { label: string; description: string; scrollStart: number; scrollEnd: number }[]
}

export default function HardwareProjectViewer({ modelPath, sections: _sections }: HardwareProjectViewerProps) {
  return (
    <div className="relative bg-[#242424] border border-[#1f1f1f] rounded-none overflow-hidden">
      <div className="aspect-[16/9] flex items-center justify-center">
        <div className="text-center px-8">
          <div className="w-16 h-16 mx-auto mb-4 border-2 border-[#7C3AED]/30 rounded-none flex items-center justify-center">
            <svg className="w-8 h-8 text-[#7C3AED]/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75l2.25-1.313M12 21.75V19.5m0 2.25l-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25" />
            </svg>
          </div>
          <h3 className="font-display font-bold text-white text-lg mb-2 uppercase">3D Model Viewer</h3>
          <p className="text-gray-500 text-sm max-w-sm mx-auto mb-4">
            The scroll-driven 3D assembly experience will be available once the GLTF model is exported from the hardware design files.
          </p>
          <p className="font-mono text-gray-600 text-xs">
            Model path: {modelPath}
          </p>
          <p className="font-mono text-[#7C3AED]/50 text-xs mt-2">
            Install @react-three/fiber to enable 3D rendering
          </p>
        </div>
      </div>
    </div>
  )
}
