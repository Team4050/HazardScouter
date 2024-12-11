// import { Button } from "@mantine/core";
// import {
//   Dropzone,
//   type FileWithPath,
//   IMAGE_MIME_TYPE,
// } from "@mantine/dropzone";
// import { IconPhoto, IconUpload, IconX } from "@tabler/icons-react";
// import { createFileRoute } from "@tanstack/react-router";
// import { useEffect, useRef, useState } from "react";

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/map-builder")({
  // component: () => <ImageMapGenerator />,
  component: () => <div>Map Builder</div>,
});

// type Area = {
//   x: number;
//   y: number;
//   width: number;
//   height: number;
//   name?: string;
// };

// export function ImageMapGenerator(): ReactNode {
//   const [image, setImage] = useState<HTMLImageElement | null>(null);
//   const [areas, setAreas] = useState<Area[]>([]);
//   const [drawing, setDrawing] = useState(false);
//   const [currentArea, setCurrentArea] = useState<Area | undefined>();
//   const [generatedHtml, setGeneratedHtml] = useState("");
//   const [editingIndex, setEditingIndex] = useState<number | undefined>();
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const imageRef = useRef<HTMLImageElement>(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!image || !canvas) return;

//     const ctx = canvas.getContext("2d");
//     if (ctx) {
//       ctx.clearRect(0, 0, canvas.width, canvas.height);
//       drawAreas(ctx);
//     }
//   }, [image]);

//   const handleImageUpload = (files: FileWithPath[]) => {
//     if (files.length !== 1) return;
//     const img = new Image();

//     files[0].arrayBuffer().then((buffer) => {
//       img.src = `data:${files[0].type};base64,${arrayBufferToBase64(buffer)}`;
//       setImage(img);
//     });
//   };

//   const startDrawing = (e: MouseEvent) => {
//     e.preventDefault();

//     const { offsetX, offsetY } = getCoordinates(e);
//     setDrawing(true);
//     setCurrentArea({ x: offsetX, y: offsetY, width: 0, height: 0 });
//   };

//   const draw = (e: MouseEvent) => {
//     e.preventDefault();

//     if (!drawing) return;
//     const { offsetX, offsetY } = getCoordinates(e);
//     setCurrentArea((prev) => ({
//       ...prev,
//       width: offsetX - prev.x,
//       height: offsetY - prev.y,
//     }));
//   };

//   const stopDrawing = (e: MouseEvent) => {
//     e.preventDefault();

//     if (drawing) {
//       setAreas([
//         ...areas,
//         { ...currentArea, name: `Area ${areas.length + 1}` },
//       ]);
//       setDrawing(false);
//     }
//   };

//   const getCoordinates = (e: MouseEvent) => {
//     const canvas = canvasRef.current;
//     if (!canvas) return { offsetX: 0, offsetY: 0 };

//     const rect = canvas.getBoundingClientRect();
//     const scaleX = canvas.width / rect.width;
//     const scaleY = canvas.height / rect.height;
//     return {
//       offsetX: (e.clientX - rect.left) * scaleX,
//       offsetY: (e.clientY - rect.top) * scaleY,
//     };
//   };

//   const drawAreas = (ctx: CanvasRenderingContext2D) => {
//     ctx.strokeStyle = "red";
//     ctx.lineWidth = 2;
//     areas.forEach((area, index) => {
//       ctx.strokeRect(area.x, area.y, area.width, area.height);
//       if (index === editingIndex) {
//         ctx.fillStyle = "rgba(255, 0, 0, 0.2)";
//         ctx.fillRect(area.x, area.y, area.width, area.height);
//       }
//     });
//     if (drawing) {
//       ctx.strokeRect(
//         currentArea.x,
//         currentArea.y,
//         currentArea.width,
//         currentArea.height,
//       );
//     }
//   };

//   const generateHtml = () => {
//     if (!image) return;

//     let html = `<img src="your-image-url.jpg" usemap="#imagemap" alt="Your image description">\n`;
//     html += `<map name="imagemap">\n`;

//     areas.forEach((area, index) => {
//       const coords = `${Math.round(area.x)},${Math.round(area.y)},${Math.round(area.x + area.width)},${Math.round(area.y + area.height)}`;
//       html += `  <area shape="rect" coords="${coords}" href="#" alt="${area.name}">\n`;
//     });

//     html += "</map>";
//     setGeneratedHtml(html);
//   };

//   const updateAreaName = (index: number, newName: string) => {
//     const updatedAreas = [...areas];
//     updatedAreas[index].name = newName;
//     setAreas(updatedAreas);
//   };

//   const deleteArea = (index: number) => {
//     const updatedAreas = areas.filter((_, i) => i !== index);
//     setAreas(updatedAreas);
//     setEditingIndex(undefined);
//   };

//   const startEditing = (index: number) => {
//     setEditingIndex(index);
//   };

//   const updateArea = (e: MouseEvent) => {
//     if (!editingIndex) return;

//     const { offsetX, offsetY } = getCoordinates(e);
//     const updatedAreas = [...areas];
//     const area = updatedAreas[editingIndex];

//     if (e.buttons === 1) {
//       // Left mouse button is pressed
//       area.x = offsetX - area.width / 2;
//       area.y = offsetY - area.height / 2;
//     } else if (e.buttons === 2) {
//       // Right mouse button is pressed
//       area.width = Math.abs(offsetX - area.x);
//       area.height = Math.abs(offsetY - area.y);
//     }

//     setAreas(updatedAreas);
//   };

//   const stopEditing = () => {
//     setEditingIndex(undefined);
//   };

//   return (
//     <div className="max-w-screen-md mx-auto space-y-5">
//       <div className="w-full h-[500px]">
//         {!image ? (
//           <Dropzone
//             onDrop={handleImageUpload}
//             onReject={(files) => console.log("rejected files", files)}
//             maxSize={5 * 1024 ** 2}
//             maxFiles={1}
//             accept={IMAGE_MIME_TYPE}
//             className="border-2 border-dashed rounded-lg size-full"
//             classNames={{
//               inner: "flex flex-col items-center justify-center h-full",
//             }}
//           >
//             <div className="flex items-center justify-center gap-x-10">
//               <Dropzone.Accept>
//                 <IconUpload className="size-16 text-primary" stroke={1.5} />
//               </Dropzone.Accept>
//               <Dropzone.Reject>
//                 <IconX className="size-16 text-red-500" stroke={1.5} />
//               </Dropzone.Reject>
//               <Dropzone.Idle>
//                 <IconPhoto className="size-16" stroke={1.5} />
//               </Dropzone.Idle>

//               <div className="gap-y-4">
//                 <div className="text-4xl">
//                   Drag images here or click to select files
//                 </div>
//                 <div className="text-2xl font-light">
//                   Attach as many files as you like, each file should not exceed
//                   5mb
//                 </div>
//               </div>
//             </div>
//           </Dropzone>
//         ) : (
//           <div className="size-full">
//             <canvas
//               ref={canvasRef}
//               className="absolute top-0 left-0"
//               onMouseDown={editingIndex !== null ? updateArea : startDrawing}
//               onMouseMove={editingIndex !== null ? updateArea : draw}
//               onMouseUp={editingIndex !== null ? stopEditing : stopDrawing}
//               onMouseLeave={editingIndex !== null ? stopEditing : stopDrawing}
//               onContextMenu={(e) => e.preventDefault()}
//             />
//             <img
//               ref={imageRef}
//               src={image.src}
//               alt="Uploaded image"
//               className="max-w-full h-auto"
//               onDragStart={(e) => e.preventDefault()}
//             />
//           </div>
//         )}
//       </div>

//       <Controls
//         onClearImage={() => setImage(null)}
//         onGenerateHtml={() => generateHtml()}
//       />

//       <div className="mb-4">
//         <h3 className="text-lg font-semibold mb-2">Areas</h3>
//         {areas.map((area, index) => (
//           <div key={index} className="flex items-center mb-2">
//             <input
//               value={area.name}
//               onChange={(e) => updateAreaName(index, e.target.value)}
//               className="mr-2"
//             />
//             <button onClick={() => startEditing(index)} className="mr-2">
//               Edit
//             </button>
//             <button onClick={() => deleteArea(index)}>X</button>
//           </div>
//         ))}
//       </div>

//       <button onClick={generateHtml} className="mb-4">
//         Generate HTML
//       </button>

//       {generatedHtml ? <pre>{generatedHtml}</pre> : null}
//     </div>
//   );
// }

// type ControlsProps = {
//   onClearImage: () => void;
//   onGenerateHtml: () => void;
// };

// function Controls({
//   onClearImage,
//   onGenerateHtml,
// }: ControlsProps): ReactNode {
//   return (
//     <div className="flex justify-between">
//       <Button onClick={onClearImage}>Clear Image</Button>
//       <Button onClick={onGenerateHtml}>Generate HTML</Button>
//     </div>
//   );
// }

// function arrayBufferToBase64(buffer: ArrayBuffer): string {
//   let binary = "";
//   const bytes = new Uint8Array(buffer);
//   for (let i = 0; i < bytes.byteLength; i++) {
//     binary += String.fromCharCode(bytes[i]);
//   }
//   return window.btoa(binary);
// }
