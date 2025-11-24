// export async function preloadedImages(imageList) {
//   const preloadedImages = {};
//     // Function to preload a single image
//   async function preloadImage(url) {
//     return new Promise((resolve, reject) => {
//       const img = new Image();
//       img.onload = () => resolve(img.src);
//       img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
//       img.src = url;
//     });
//   }

// //  await Promise.all(
// //     imageList.map(async (item) => {
// //       try {
// //         const preloadedUrl = await preloadImage(item.src);
// //         preloadedImages[item.assetType] = preloadedUrl;
// //       } catch (error) {
// //         console.error(error);
// //       }
// //     })
// //   );
// await Promise.all(
//   imageList.map(async (item) => {
//     try {
//       // const preloadedUrls = {}; // This will hold the preloaded URLs for the current item

//       // Ensure item.src is an array and iterate through it
//       if (Array.isArray(item.src)) {
//         console.log(`Processing assetType: ${item.assetType}`); // Debugging
//         preloadedImages[item.assetType] = [];
//         for (const srcObj of item.src) {
//           if (srcObj) {
              
//             // Preload the male image URL if it exists
//             // if (srcObj.maleSrc1 && typeof srcObj.maleSrc1 === "string" && srcObj.maleSrc1.trim() !== "") {
//               try {
//                 console.log(`Preloading male image: ${srcObj.src}`);
//                 const preloadedUrl = await preloadImage(srcObj.src);
//                 console.log('demo male',preloadedUrl) // Preload the male image
//                 let obj = {
//                   src:preloadedUrl,
//                   id:srcObj.id,
//                    name:srcObj.name || '',
//                   theme:srcObj.theme || ''
//                 }
//                 preloadedImages[item.assetType].push(obj) // Store preloaded male URL
//               } catch (error) {
//                 console.error(`Error preloading male image (${srcObj.src}):`, error);
//               }
//             // }

//           }
//         }
//       } else {
//        const preloadedUrl = await preloadImage(item.src);
//           preloadedImages[item.assetType] = preloadedUrl; // Log invalid src array
//       }

//       // // After preloading, store the URLs in the preloadedImages object under assetType
//       // if (preloadedUrls && Object.keys(preloadedUrls).length > 0) {
//       //   preloadedImages[item.assetType] = preloadedUrls; // Store preloaded URLs for this asset type
//       // } else {
//       //   console.warn(`No preloaded URLs for assetType: ${item.assetType}`); // Debugging empty preloaded URLs
//       // }
//     } catch (error) {
//       console.error("Error processing item:", item, error); // Log any errors processing the item
//     }
//   })
// );
//   return preloadedImages;
// }

// export async function preloadedImages(imageList) {
//   const preloadedImages = {};

//   const deferredTypes = ['character_Image'];

//   const essentialImages = imageList?.filter(item => !deferredTypes.includes(item?.assetType));
//   const deferredImages = imageList?.filter(item => deferredTypes.includes(item?.assetType));

//   async function preloadImage(url) {
//     return new Promise((resolve, reject) => {
//       const img = new Image();
//       img.onload = () => resolve(img?.src);
//       img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
//       img.src = url;
//     });
//   }

//   async function loadImageGroup(images, label) {
//     console.log(`\n🚀 Starting to preload ${label} assets...`);
//     await Promise.all(
//       images.map(async (item) => {
//         try {
//           if (Array.isArray(item?.src)) {
//             preloadedImages[item.assetType] = [];
//             for (const srcObj of item.src) {
//               if (srcObj && srcObj.src) {
//                 const preloadedUrl = await preloadImage(srcObj.src);
//                 preloadedImages[item.assetType].push({
//                   src: preloadedUrl,
//                   id: srcObj.id || srcObj.pose,
//                   name: srcObj.name || '',
//                   theme: srcObj.theme || ''
//                 });
//               }
//             }
//           } else {
//             const preloadedUrl = await preloadImage(item.src);
//             preloadedImages[item.assetType] = preloadedUrl;
//           }
//         } catch (error) {
//           console.error(`❌ Error preloading image for ${item.assetType}:`, error);
//         }
//       })
//     );
//     console.log(`✅ Finished preloading ${label} assets.`);
//   }

//   // 1. Load essential images first
//   await loadImageGroup(essentialImages, 'essential');

//   // 2. Log loaded image URLs
//   console.log("\n✅ All preloaded image URLs (essentials):");
//   Object.entries(preloadedImages).forEach(([assetType, entries]) => {
//     console.log(`📦 Asset Type: ${assetType}`);
//     if (Array.isArray(entries)) {
//       entries?.forEach((img, idx) => console.log(`  ${idx + 1}. ${img.src}`));
//     } else {
//       console.log(`  1. ${entries}`);
//     }
//   });

//   // 3. Optionally start deferred loading in the background
//   setTimeout(() => {
//     loadImageGroup(deferredImages, 'deferred (lazy-loaded)');
//   }, 100); // You can control when deferred images begin loading

//   return preloadedImages;
// }

// export async function preloadedGLBFiles(glbList) {
//   const preloadedGLBFiles = {};
// console.log("glbList--glbList",glbList)
//   // Function to preload a single GLB file
//   async function preloadGLB(url) {
//     try {
//       const response = await fetch(url);
//       if (!response.ok) {
//         throw new Error(`Failed to load GLB file: ${url}`);
//       }
//       const buffer = await response.arrayBuffer();
//       return URL.createObjectURL(new Blob([buffer]));
//     } catch (error) {
//       throw error;
//     }
//   }

//   // await Promise.all(
//   //   glbList.map(async (item) => {
//   //     try {
//   //       const preloadedData = await preloadGLB(item.src);
//   //       preloadedGLBFiles[item.assetType] = preloadedData;
//   //     } catch (error) {
//   //       console.error(error);
//   //     }
//   //   })
//   // );
//   await Promise.all(
//     glbList.map(async (item) => {
//       try {
//         const preloadedData = await preloadGLB(item.src);
  
//         // If item has a uniqueId, include it in the object
//         if (item.uniqueId) {
//           preloadedGLBFiles[item.assetType] = {
//             src: preloadedData,
//             uniqueId: item.uniqueId,
//           };
//         } else {
//           preloadedGLBFiles[item.assetType] = preloadedData;
//         }
  
//       } catch (error) {
//         console.error(error);
//       }
//     })
//   );
//   return preloadedGLBFiles;
// }

// const preloadedImagesCache = {};
// const preloadedUrlsCache = new Set(); // Keeps track of already loaded URLs

// const deferredTypes = ['character_Image'];

// export async function preloadedImages(imageList) {
//   const essentialImages = imageList?.filter(item => !deferredTypes.includes(item?.assetType));
//   const deferredImages = imageList?.filter(item => deferredTypes.includes(item?.assetType));

//   async function preloadImage(url) {
//     if (preloadedUrlsCache.has(url)) {
//       console.log(`🔁 Skipping already preloaded image: ${url}`);
//       return url; // Return existing URL
//     }

//     return new Promise((resolve, reject) => {
//       const img = new Image();
//       img.onload = () => {
//         preloadedUrlsCache.add(url);
//         resolve(img.src);
//       };
//       img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
//       img.src = url;
//     });
//   }

//   async function loadImageGroup(images, label) {
//     console.log(`\n🚀 Starting to preload ${label} assets...`);
//     await Promise.all(
//       images.map(async (item) => {
//         try {
//           if (Array.isArray(item?.src)) {
//             if (!Array.isArray(preloadedImagesCache[item.assetType])) {
//               preloadedImagesCache[item.assetType] = [];
//             }
//             for (const srcObj of item.src) {
//               if (srcObj?.src) {
//                 const preloadedUrl = await preloadImage(srcObj.src);
//                 // Avoid adding duplicates inside the array
//                 if (!preloadedImagesCache[item.assetType].some(img => img.src === preloadedUrl)) {
//                   preloadedImagesCache[item.assetType].push({
//                     src: preloadedUrl,
//                     id: srcObj.id || srcObj.pose,
//                     name: srcObj.name || '',
//                     theme: srcObj.theme || ''
//                   });
//                 }
//               }
//             }
//           } else {
//             const preloadedUrl = await preloadImage(item.src);
//             preloadedImagesCache[item.assetType] = preloadedUrl;
//           }
//         } catch (error) {
//           console.error(`❌ Error preloading image for ${item.assetType}:`, error);
//         }
//       })
//     );
//     console.log(`✅ Finished preloading ${label} assets.`);
//   }

//   // Load essentials first
//   await loadImageGroup(essentialImages, 'essential');

//   console.log("\n✅ All preloaded image URLs (essentials):");
//   Object.entries(preloadedImagesCache).forEach(([assetType, entries]) => {
//     console.log(`📦 Asset Type: ${assetType}`);
//     if (Array.isArray(entries)) {
//       entries.forEach((img, idx) => console.log(`  ${idx + 1}. ${img.src}`));
//     } else {
//       console.log(`  1. ${entries}`);
//     }
//   });

//   // Load deferred in background
//   setTimeout(() => {
//     loadImageGroup(deferredImages, 'deferred (lazy-loaded)');
//   }, 100);

//   return preloadedImagesCache;
// }


// const preloadedGLBFilesCache = {};
// const preloadedGLBUrlsCache = new Set();

// export async function preloadedGLBFiles(glbList) {
//   console.log("glbList", glbList);

//   async function preloadGLB(url) {
//     try {
//       const response = await fetch(url);
//       if (!response.ok) {
//         throw new Error(`Failed to load GLB file: ${url}`);
//       }
//       const buffer = await response.arrayBuffer();
//       return URL.createObjectURL(new Blob([buffer]));
//     } catch (error) {
//       throw error;
//     }
//   }

//   await Promise.all(
//     glbList.map(async (item) => {
//       try {
//         const identifier = item.uniqueId || item.src;

//         // Skip if we've already loaded this identifier
//         if (preloadedGLBUrlsCache.has(identifier)) {
//           console.log(`🔁 Skipping already preloaded GLB: ${identifier}`);
//           return;
//         }

//         // Mark as loaded
//         preloadedGLBUrlsCache.add(identifier);

//         // Load file
//         const preloadedData = await preloadGLB(item.src);

//         if (item.uniqueId) {
//           preloadedGLBFilesCache[item.assetType] = {
//             src: preloadedData,
//             uniqueId: item.uniqueId,
//           };
//         } else {
//           preloadedGLBFilesCache[item.assetType] = preloadedData;
//         }

//         console.log(`✅ Preloaded GLB: ${identifier}`);
//       } catch (error) {
//         console.error(error);
//       }
//     })
//   );

//   return preloadedGLBFilesCache;
// }


// export async function preloadedGLBFiles(glbList) {
//   console.log("glbList",glbList)
//   const preloadedGLBFiles = {};

// console.log(preloadedGLBFiles,'preloadedGLBFilesinfunction')
//   // Function to preload a single GLB file
//   async function preloadGLB(url) {
//     try {
//       const response = await fetch(url);
//       if (!response.ok) {
//         throw new Error(`Failed to load GLB file: ${url}`);
//       }
//       const buffer = await response.arrayBuffer();
//       return URL.createObjectURL(new Blob([buffer]));
//     } catch (error) {
//       throw error;
//     }
//   }




//   await Promise.all(
//     glbList.map(async (item) => {
//       try {
//         const preloadedData = await preloadGLB(item.src);
//          console.log(preloadedData,'preloadedData')
//         // If item has a uniqueId, include it in the object
//         if (item.uniqueId) {
//           console.log('workingpreloadedid')
//           preloadedGLBFiles[item.assetType] = {
//             src: preloadedData,
//             uniqueId: item.uniqueId,
//           };
//         } else {
//           console.log('workingpreloadedidwithno')

//           preloadedGLBFiles[item.assetType] = preloadedData;
//           console.log(preloadedGLBFiles,'preloadedGLBFilesinfunctioninside')
//         }
//   console.log(preloadedGLBFiles,'preloadedGLBFilesinfunctionoutside')
//       } catch (error) {
//         console.error(error);
//       }
//     })
//   );
//   return preloadedGLBFiles;
// }

// export async function preloadedGLBFiles(glbList) {
//   console.log(glbList,'glbList')
//   // Function to preload a single GLB file
//   async function preloadGLB(url) {
//     const response = await fetch(url);
//     if (!response.ok) {
//       throw new Error(`Failed to load GLB file: ${url}`);
//     }
//     const buffer = await response.arrayBuffer();
//     return URL.createObjectURL(new Blob([buffer]));
//   }

//   // Fetch all in parallel and return mapped results
//   const results = await Promise.all(
//     glbList.map(async (item) => {
//       const preloadedData = await preloadGLB(item.src);
//         console.log(preloadedData,'preloadedData')
//       return {
//         assetType: item.assetType,
//         data: item.uniqueId
//           ? { src: preloadedData, uniqueId: item.uniqueId }
//           : preloadedData,
//       };
//     })
//   );

//   // Build object only after all are done
//   const preloadedGLBFiles = results.reduce((acc, { assetType, data }) => {
//     acc[assetType] = data;
//     return acc;
//   }, {});
// console.log(preloadedGLBFiles,'preloadedGLBFiles')
//   return preloadedGLBFiles;
// }



export async function preloadedImages(imageList) {
  const preloadedImages = {};

  const deferredTypes = ['character_Image'];

  const essentialImages = imageList?.filter(item => !deferredTypes.includes(item?.assetType));
  const deferredImages = imageList?.filter(item => deferredTypes.includes(item?.assetType));

  async function preloadImage(url) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img?.src);
      img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
      img.src = url;
    });
  }

  async function loadImageGroup(images, label) {
    console.log(`\n🚀 Starting to preload ${label} assets...`);
    await Promise.all(
      images.map(async (item) => {
        try {
          if (Array.isArray(item?.src)) {
            preloadedImages[item.assetType] = [];
            for (const srcObj of item.src) {
              if (srcObj && srcObj.src) {
                const preloadedUrl = await preloadImage(srcObj.src);
                preloadedImages[item.assetType].push({
                  src: preloadedUrl,
                  id: srcObj.id || srcObj.pose,
                  name: srcObj.name || '',
                  theme: srcObj.theme || ''
                });
              }
            }
          } else {
            const preloadedUrl = await preloadImage(item.src);
            preloadedImages[item.assetType] = preloadedUrl;
          }
        } catch (error) {
          console.error(`❌ Error preloading image for ${item.assetType}:`, error);
        }
      })
    );
    console.log(`✅ Finished preloading ${label} assets.`);
  }

  // 1. Load essential images first
  await loadImageGroup(essentialImages, 'essential');

  // 2. Log loaded image URLs
  console.log("\n✅ All preloaded image URLs (essentials):");
  Object.entries(preloadedImages).forEach(([assetType, entries]) => {
    console.log(`📦 Asset Type: ${assetType}`);
    if (Array.isArray(entries)) {
      entries?.forEach((img, idx) => console.log(`  ${idx + 1}. ${img.src}`));
    } else {
      console.log(`  1. ${entries}`);
    }
  });

  // 3. Optionally start deferred loading in the background
  setTimeout(() => {
    loadImageGroup(deferredImages, 'deferred (lazy-loaded)');
  }, 100); // You can control when deferred images begin loading

  return preloadedImages;
}

export async function preloadedGLBFiles(glbList) {
  console.log(glbList, 'glbList');

  async function preloadGLB(url) {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to load GLB file: ${url}`);
    }
    const buffer = await response.arrayBuffer();
    return URL.createObjectURL(new Blob([buffer]));
  }

  const preloadedGLBFiles = {};

  for (const item of glbList) {
    try {
      const preloadedData = await preloadGLB(item.src);
      console.log(preloadedData, 'preloadedData');

      preloadedGLBFiles[item.assetType] = item.uniqueId
        ? { src: preloadedData, uniqueId: item.uniqueId }
        : { src: preloadedData }; // keep structure consistent
    } catch (err) {
      console.error(`Failed to preload ${item.assetType}:`, err);
    }
  }

  console.log(preloadedGLBFiles, 'preloadedGLBFiles');
  return preloadedGLBFiles;
}

// export async function preloadedGLBFiles(glbList) {
//   console.log(glbList,'glblistinpreloaded')
//   const results = await Promise.all(
//     glbList.map(async (item) => {
//       try {
//         const response = await fetch(item.src);
//         console.log(response,'responseinpreloaded')
//         if (!response.ok) throw new Error("Failed " + item.src);

//         const buffer = await response.arrayBuffer();
//         const blobUrl = URL.createObjectURL(new Blob([buffer]));

//         return [item.assetType, { src: blobUrl, uniqueId: item.uniqueId }];
//       } catch (err) {
//         console.error(`Failed to preload ${item.assetType}:`, err);
//         return null;
//       }
//     })
//   );

//   return Object.fromEntries(results.filter(Boolean));
// }

