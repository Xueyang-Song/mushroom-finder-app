-- ============================================================
-- Seed data: Top edible mushrooms in Washington state
-- ============================================================

insert into public.mushrooms (name, scientific_name, description, seasons, forest_types, public_areas, is_morel) values
(
  'Morel',
  'Morchella spp.',
  'Highly prized spring mushroom found in burn areas and disturbed soils. Honeycomb-shaped cap. Only harvest when positively identified.',
  '{"spring"}',
  '{"conifer","mixed"}',
  '{"national_forest","state_forest","blm"}',
  true
),
(
  'Chanterelle',
  'Cantharellus formosus',
  'Golden to yellow funnel-shaped mushroom with false gills. One of the Pacific Northwest''s most popular edible species.',
  '{"fall","summer"}',
  '{"conifer","mixed"}',
  '{"national_forest","state_park","state_forest"}',
  false
),
(
  'King Bolete',
  'Boletus edulis',
  'Large mushroom with a brown cap and thick white stem. Excellent edible found under conifers.',
  '{"fall","summer"}',
  '{"conifer"}',
  '{"national_forest","state_forest"}',
  false
),
(
  'Lobster Mushroom',
  'Hypomyces lactifluorum',
  'A parasitic fungus that transforms host mushrooms into a bright orange-red, seafood-flavored delicacy.',
  '{"fall","summer"}',
  '{"conifer","mixed"}',
  '{"national_forest","state_forest"}',
  false
),
(
  'Chicken of the Woods',
  'Laetiporus spp.',
  'Bright orange and yellow shelf fungus growing on tree trunks. Firm texture similar to chicken.',
  '{"summer","fall"}',
  '{"deciduous","mixed"}',
  '{"national_forest","state_park","state_forest"}',
  false
),
(
  'Oyster Mushroom',
  'Pleurotus ostreatus',
  'Fan-shaped mushroom growing on dead or dying hardwood. Mild flavor and widely available.',
  '{"fall","winter","spring"}',
  '{"deciduous","mixed"}',
  '{"national_forest","state_park","state_forest","blm"}',
  false
),
(
  'Matsutake',
  'Tricholoma murrillianum',
  'Aromatic mushroom prized in Asian cuisine. Found under conifers in sandy or volcanic soils.',
  '{"fall"}',
  '{"conifer"}',
  '{"national_forest","state_forest"}',
  false
),
(
  'Hedgehog Mushroom',
  'Hydnum repandum',
  'Mild-flavored mushroom with tooth-like spines under the cap instead of gills. Beginner-friendly identification.',
  '{"fall","winter"}',
  '{"conifer","mixed"}',
  '{"national_forest","state_park","state_forest"}',
  false
),
(
  'Porcini',
  'Boletus fibrillosus',
  'Pacific Northwest porcini with a nutty, earthy flavor. Found in older conifer forests.',
  '{"fall"}',
  '{"conifer"}',
  '{"national_forest","state_forest"}',
  false
),
(
  'Cauliflower Mushroom',
  'Sparassis radicata',
  'Large, ruffled mushroom resembling a head of cauliflower. Grows at the base of conifers.',
  '{"fall"}',
  '{"conifer"}',
  '{"national_forest","state_forest"}',
  false
);

-- ============================================================
-- Seed data: Sample wildfire areas in Washington (for morel)
-- ============================================================

insert into public.wildfire_areas (fire_name, fire_year, latitude, longitude, acres, state, data_source) values
('Schneider Springs Fire', 2021, 46.78, -121.16, 107000, 'WA', 'NIFC Open Data'),
('Cedar Creek Fire', 2021, 46.85, -121.22, 3400, 'WA', 'NIFC Open Data'),
('Goat Rocks Fire', 2022, 46.50, -121.40, 6500, 'WA', 'InciWeb / NIFC'),
('Bolt Creek Fire', 2022, 47.74, -121.39, 14800, 'WA', 'NIFC Open Data'),
('Varden Fire', 2023, 48.15, -120.65, 8200, 'WA', 'NIFC Open Data'),
('Gray Fire', 2023, 47.42, -117.40, 10100, 'WA', 'NIFC Open Data'),
('Oregon Road Fire', 2023, 47.45, -117.55, 9600, 'WA', 'NIFC Open Data'),
('Cougar Creek Fire', 2022, 46.85, -121.70, 4500, 'WA', 'InciWeb / NIFC'),
('Williams Mine Fire', 2024, 48.80, -120.10, 3200, 'WA', 'NIFC Open Data'),
('Sourdough Fire', 2023, 48.80, -121.05, 3500, 'WA', 'NIFC Open Data');

-- ============================================================
-- Seed data: Sample hunting spots in Washington
-- ============================================================

insert into public.spots (name, description, latitude, longitude, season, forest_type, area_type, data_source, data_updated_at) values
('Gifford Pinchot NF – South', 'Chanterelle and bolete territory in old-growth conifer stands.', 46.10, -121.90, 'fall', 'conifer', 'national_forest', 'USFS Open Data', now()),
('Olympic NF – Quinault', 'Oyster and hedgehog mushrooms in mixed rainforest terrain.', 47.46, -123.85, 'fall', 'mixed', 'national_forest', 'USFS Open Data', now()),
('Mt. Baker-Snoqualmie NF', 'Matsutake and chanterelle hunting in high-elevation conifer forests.', 48.20, -121.50, 'fall', 'conifer', 'national_forest', 'USFS Open Data', now()),
('Okanogan-Wenatchee NF – East', 'Post-fire morel territory near recent burn areas.', 47.50, -120.70, 'spring', 'conifer', 'national_forest', 'USFS / NIFC Open Data', now()),
('Capitol State Forest', 'Chanterelle and lobster mushroom spots in managed state forest.', 46.88, -123.20, 'fall', 'conifer', 'state_forest', 'WA DNR', now()),
('Colville NF – Northeast', 'King bolete and porcini in remote conifer stands.', 48.70, -117.80, 'fall', 'conifer', 'national_forest', 'USFS Open Data', now());
