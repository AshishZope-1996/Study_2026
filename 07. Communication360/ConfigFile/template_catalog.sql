-- PostgreSQL DDL
CREATE TABLE IF NOT EXISTS public."TemplateCatalog" (
    "TemplateId" SERIAL PRIMARY KEY,
    "TemplateFile" VARCHAR(255) NOT NULL UNIQUE,
    "CampaignType" VARCHAR(100) NOT NULL,
    "DisplayName" VARCHAR(255) NOT NULL,
    "Subject" TEXT,
    "PdfPath" TEXT,
    "IsActive" BOOLEAN DEFAULT TRUE,
    "CreatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- DML: insert / update template record with PDF path
INSERT INTO public."TemplateCatalog" (
    "TemplateFile",
    "CampaignType",
    "DisplayName",
    "Subject",
    "PdfPath",
    "IsActive"
)
VALUES
    (
        'LinkdinPost.html',
        'LinkedIn',
        'LinkedIn Notes Outreach',
        'Sharing My Notes With You',
        'C:/Users/zope1/OneDrive/Desktop/Study_2026/Study_2026/07. Communication360/Templates/PDF/LinkdinPost.pdf',
        TRUE
    ),
    (
        'Festival_Diwali.html',
        'Festival',
        'Festival - Diwali',
        'AAshish Zope',
        'C:/Users/zope1/OneDrive/Desktop/Study_2026/Study_2026/07. Communication360/Templates/PDF/Festival_Diwali.pdf',
        TRUE
    ),
    (
        'Holi.html',
        'Festival',
        'Festival - Holi',
        'Happy Holi!',
        'C:/Users/zope1/OneDrive/Desktop/Study_2026/Study_2026/07. Communication360/Templates/PDF/Holi.pdf',
        TRUE
    )
ON CONFLICT ("TemplateFile")
DO UPDATE SET
    "CampaignType" = EXCLUDED."CampaignType",
    "DisplayName" = EXCLUDED."DisplayName",
    "Subject" = EXCLUDED."Subject",
    "PdfPath" = EXCLUDED."PdfPath",
    "IsActive" = EXCLUDED."IsActive";

SELECT *
FROM public."TemplateCatalog"
ORDER BY "CampaignType", "DisplayName";
