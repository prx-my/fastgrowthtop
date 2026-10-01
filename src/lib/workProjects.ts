import fs from "fs";
import path from "path";
import { projectsData, ProjectItem, ProjectPage } from "@/data/projects";
import { getImageSize } from "@/lib/imageSize";

// Supported image extensions
const IMAGE_EXTENSIONS = new Set([
  ".png",
  ".jpg",
  ".jpeg",
  ".webp",
  ".avif",
  ".gif",
  ".svg",
]);

function toCleanTitle(str: string): string {
  return str
    .replace(/^[\d\s-_]+/, "") // remove leading numbers and punctuation like "01 - "
    .replace(/[-_]+/g, " ") // replace dashes/underscores with space
    .trim();
}

function toSlug(str: string): string {
  return str
    .toLowerCase()
    .replace(/^[\d\s-_]+/, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Dynamically scans the public/work directory.
 * Each subfolder represents a project (e.g. "Grace Electric", "03 - Aces Marine & Salvage").
 * Each image inside a subfolder represents a page/screenshot of that project.
 * If a project matches an existing project in projectsData, its metadata (links, descriptions) is retained.
 * If new folders are created, they automatically show up with auto-formatted names and page counts.
 */
export function getWorkProjects(): ProjectItem[] {
  const workDir = path.join(process.cwd(), "public", "work");

  if (!fs.existsSync(workDir)) {
    return projectsData;
  }

  let folderNames: string[] = [];
  try {
    folderNames = fs
      .readdirSync(workDir, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory() && !dirent.name.startsWith("."))
      .map((dirent) => dirent.name);
  } catch (err) {
    console.error("Error reading public/work directory:", err);
    return projectsData;
  }

  if (folderNames.length === 0) {
    return projectsData;
  }

  // Sort folders naturally (preserving "01 - ", "02 - " ordering or alphabetical)
  folderNames.sort((a, b) =>
    a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" })
  );

  const scannedProjects: ProjectItem[] = [];

  folderNames.forEach((folderName, index) => {
    const folderPath = path.join(workDir, folderName);
    const cleanName = toCleanTitle(folderName) || folderName;
    const slug = toSlug(folderName);

    // Read images inside this project folder
    let imageFiles: string[] = [];
    try {
      imageFiles = fs
        .readdirSync(folderPath)
        .filter((file) => {
          const ext = path.extname(file).toLowerCase();
          return IMAGE_EXTENSIONS.has(ext) && !file.startsWith(".");
        })
        .sort((a, b) =>
          a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" })
        );
    } catch (err) {
      console.error(`Error reading images for folder ${folderName}:`, err);
    }

    if (imageFiles.length === 0) {
      return; // Skip folders that have no images
    }

    // Match with existing predefined metadata if available
    const existing = projectsData.find(
      (p) =>
        toSlug(p.name) === slug ||
        p.id === slug ||
        p.name.toLowerCase() === cleanName.toLowerCase()
    );

    // Build pages from images with intrinsic dimensions
    const pages: ProjectPage[] = imageFiles.map((file, pageIdx) => {
      const pageTitle = toCleanTitle(path.parse(file).name) || `Page ${pageIdx + 1}`;
      const imagePath = `/work/${encodeURIComponent(folderName)}/${file}`;
      const filePath = path.join(folderPath, file);
      const dimensions = getImageSize(filePath);
      return {
        title: pageTitle.charAt(0).toUpperCase() + pageTitle.slice(1),
        image: imagePath,
        label: `${cleanName} — Screen ${pageIdx + 1}`,
        width: dimensions?.width,
        height: dimensions?.height,
      };
    });

    const firstImage = pages[0].image;
    const firstWidth = pages[0].width;
    const firstHeight = pages[0].height;
    const projectNumber = String(scannedProjects.length + 1).padStart(2, "0");

    if (existing) {
      scannedProjects.push({
        ...existing,
        number: projectNumber,
        heroImage: firstImage,
        desktopImage: firstImage,
        thumbnailImage: firstImage,
        imageWidth: firstWidth,
        imageHeight: firstHeight,
        pages,
      });
    } else {
      // Automatic fallback metadata for brand-new project folders
      scannedProjects.push({
        id: slug,
        number: projectNumber,
        name: cleanName,
        industry: "Client Portfolio",
        location: "Traverse City, MI",
        locationFormatted: "TRAVERSE CITY, MICHIGAN",
        categoryTag: "FEATURED WORK",
        description: `Modern digital platform and high-converting web presence engineered for ${cleanName}.`,
        services: ["Website Design", "Lead Capture", "Development", "Fast Hosting"],
        servicesTag: "WEB DESIGN · DEVELOPMENT",
        heroImage: firstImage,
        desktopImage: firstImage,
        mobileImage: firstImage,
        thumbnailImage: firstImage,
        imageWidth: firstWidth,
        imageHeight: firstHeight,
        websiteDomain: `${slug}.com`,
        liveUrl: "#contact",
        previewHeading: cleanName,
        previewSubheading: "Modern Web Design & High-Converting Architecture.",
        keyFeatures: [
          "Responsive mobile-first architecture",
          "High-performance speed and asset optimization",
          "Clean visual UX hierarchy tailored to local customer acquisition",
          "Seamless contact and inquiry conversion flow",
        ],
        resultsHighlight: "Engineered for maximum brand impact and qualified lead generation.",
        pages,
      });
    }
  });

  return scannedProjects.length > 0 ? scannedProjects : projectsData;
}
