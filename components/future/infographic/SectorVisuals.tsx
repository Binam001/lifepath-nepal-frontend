"use client";

import {
  Gauge,
  BarChart,
  LineChart,
  PieChart,
  ScatterChart,
} from "@mui/x-charts";
import {
  bankingFinanceEvidence,
  businessEntrepreneurshipEvidence,
  businessEvidence,
  changeSignals,
  designEvidence,
  educationEvidence,
  energyHydropowerEvidence,
  engineeringConstructionEvidence,
  healthEvidence,
  infrastructureEvidence,
  legalLawEvidence,
  marketingEvidence,
  manufacturingProductionEvidence,
  mediaEntertainmentEvidence,
  otherEvidence,
  researchDevelopmentEvidence,
  salesMarketingEvidence,
  sectorPerformance,
  securityServicesEvidence,
  technologyEvidence,
  tourismHospitalityEvidence,
  transportLogisticsEvidence,
  freelancingRemoteEvidence,
  type FutureSectorKey,
} from "@/constants/future-infographics";
import {
  chartPalette,
  chartSx,
} from "@/components/future/infographic/chart-config";
import { Card, InsightList } from "@/components/future/infographic/Primitives";

type SkillPoint = {
  label: string;
  score: number;
  note: string;
};

type SectorComparisonItem = {
  key: string;
  label: string;
  demandScore: number;
  declineScore: number;
};

type SectorVisualsProps = {
  activeSector: FutureSectorKey;
  demandItems: string[];
  declineItems: string[];
  currentSkills: SkillPoint[];
  sectorComparison: SectorComparisonItem[];
  sectorDemandDistribution: Array<{ id: string; value: number; label: string }>;
};

function getSectorEvidence(activeSector: FutureSectorKey) {
  switch (activeSector) {
    case "banking-finance":
      return bankingFinanceEvidence;
    case "technology":
      return technologyEvidence;
    case "design":
      return designEvidence;
    case "marketing":
      return marketingEvidence;
    case "business":
      return businessEvidence;
    case "health":
      return healthEvidence;
    case "education":
      return educationEvidence;
    case "infrastructure":
      return infrastructureEvidence;
    case "other":
      return otherEvidence;
    case "tourism-hospitality":
      return tourismHospitalityEvidence;
    case "sales-marketing":
      return salesMarketingEvidence;
    case "engineering-construction":
      return engineeringConstructionEvidence;
    case "transport-logistics":
      return transportLogisticsEvidence;
    case "manufacturing-production":
      return manufacturingProductionEvidence;
    case "energy-hydropower":
      return energyHydropowerEvidence;
    case "legal-law":
      return legalLawEvidence;
    case "media-entertainment":
      return mediaEntertainmentEvidence;
    case "business-entrepreneurship":
      return businessEntrepreneurshipEvidence;
    case "freelancing-remote":
      return freelancingRemoteEvidence;
    case "research-development":
      return researchDevelopmentEvidence;
    case "security-services":
      return securityServicesEvidence;
    default:
      return technologyEvidence;
  }
}

function getServiceSectorVisualConfig(activeSector: FutureSectorKey) {
  switch (activeSector) {
    case "tourism-hospitality":
      return {
        scatterTitle: "Experience opportunity map",
        scatterSubtitle:
          "Tourism and hospitality reward specialization, guest trust, and service quality more than generic service work.",
        pieTitle: "Path mix",
        pieSubtitle:
          "Tourism, hospitality, travel, and premium service work take the largest share here.",
        pieData: [
          { id: 0, value: 30, label: "Tourism" },
          { id: 1, value: 26, label: "Hospitality" },
          { id: 2, value: 19, label: "Guiding" },
          { id: 3, value: 15, label: "Travel planning" },
          { id: 4, value: 10, label: "General service" },
        ],
        xAxisLabel: "Flexibility",
        yAxisLabel: "Income upside",
      };
    case "freelancing-remote":
      return {
        scatterTitle: "Remote opportunity map",
        scatterSubtitle:
          "Freelancing and remote work reward proof of work, communication quality, and client trust more than credentials.",
        pieTitle: "Work mix",
        pieSubtitle:
          "Creative, writing, assistant, and remote support paths form the current mix.",
        pieData: [
          { id: 0, value: 28, label: "Graphic design" },
          { id: 1, value: 24, label: "Writing" },
          { id: 2, value: 20, label: "Virtual assistance" },
          { id: 3, value: 16, label: "Remote support" },
          { id: 4, value: 12, label: "Other freelance work" },
        ],
        xAxisLabel: "Global reach",
        yAxisLabel: "Income upside",
      };
    case "security-services":
      return {
        scatterTitle: "Security opportunity map",
        scatterSubtitle:
          "Security work is steadier than flashy, with better upside in supervisory, surveillance, and system-based roles.",
        pieTitle: "Role mix",
        pieSubtitle:
          "The sector spans frontline guarding, monitoring, coordination, and response support.",
        pieData: [
          { id: 0, value: 36, label: "Guarding" },
          { id: 1, value: 24, label: "Surveillance" },
          { id: 2, value: 18, label: "Supervision" },
          { id: 3, value: 12, label: "Response support" },
          { id: 4, value: 10, label: "Access control" },
        ],
        xAxisLabel: "Accessibility",
        yAxisLabel: "Income upside",
      };
    default:
      return {
        scatterTitle: "Niche opportunity map",
        scatterSubtitle:
          "This sector is fragmented, service-led, and highly specialization-driven rather than standardized.",
        pieTitle: "Path mix",
        pieSubtitle:
          "This category blends specialized service, coordination, and flexible work paths.",
        pieData: [
          { id: 0, value: 30, label: "Specialized service" },
          { id: 1, value: 26, label: "Operations" },
          { id: 2, value: 19, label: "Freelance service" },
          { id: 3, value: 15, label: "Coordination" },
          { id: 4, value: 10, label: "General support" },
        ],
        xAxisLabel: "Flexibility",
        yAxisLabel: "Income upside",
      };
  }
}

export function SectorVisuals({
  activeSector,
  demandItems,
  currentSkills,
  sectorComparison,
  sectorDemandDistribution,
}: SectorVisualsProps) {
  const evidenceItems = getSectorEvidence(activeSector);
  const sectorTitle = sectorPerformance[activeSector].title;
  const serviceSectorConfig = getServiceSectorVisualConfig(activeSector);

  switch (activeSector) {
    case "all":
      return (
        <div className="grid gap-6 lg:grid-cols-12">
          <Card
            title="Sector comparison"
            subtitle="Demand and decline pressure across the current sector mix."
            className="lg:col-span-7"
          >
            <BarChart
              height={320}
              dataset={sectorComparison}
              xAxis={[{ scaleType: "band", dataKey: "label" }]}
              series={[
                {
                  dataKey: "demandScore",
                  label: "Demand",
                  color: chartPalette[0],
                },
                {
                  dataKey: "declineScore",
                  label: "Decline",
                  color: chartPalette[2],
                },
              ]}
              yAxis={[{ min: 0, max: 100 }]}
              grid={{ horizontal: true }}
              sx={chartSx()}
            />
          </Card>
          <Card
            title="Demand distribution"
            subtitle="Top sectors with highest demand on the market."
            className="lg:col-span-5"
          >
            <PieChart
              height={320}
              colors={chartPalette}
              series={[
                {
                  innerRadius: 58,
                  outerRadius: 110,
                  paddingAngle: 2,
                  data: sectorDemandDistribution,
                },
              ]}
              sx={chartSx()}
            />
          </Card>
          <Card
            title="Market shift"
            subtitle="A simple view of how opportunity, skill pressure, and digital leverage are moving."
            className="lg:col-span-8"
          >
            <LineChart
              height={320}
              xAxis={[
                {
                  scaleType: "point",
                  data: ["2022", "2023", "2024", "2025", "2026"],
                },
              ]}
              series={[
                {
                  data: [44, 51, 63, 71, 82],
                  label: "Skill-led demand",
                  color: chartPalette[0],
                },
                {
                  data: [26, 31, 39, 52, 68],
                  label: "Remote leverage",
                  color: chartPalette[2],
                },
                {
                  data: [64, 59, 51, 43, 36],
                  label: "Routine work resilience",
                  color: chartPalette[5],
                },
              ]}
              grid={{ horizontal: true }}
              sx={chartSx()}
            />
          </Card>
          <Card
            title="Pressure signals"
            subtitle="Macro indicators still constraining the labour market."
            className="lg:col-span-4"
          >
            <InsightList
              items={changeSignals.map((signal) => ({
                title: `${signal.value} ${signal.label}`,
                text: signal.source,
              }))}
            />
          </Card>
        </div>
      );
    case "technology":
    case "research-development":
      return (
        <div className="grid gap-6 lg:grid-cols-12">
          <Card
            title="Technology demand curve"
            subtitle="This sector includes software, AI, electrical, mechanical, civil/environmental, and clean-energy engineering demand."
            className="lg:col-span-8"
          >
            <LineChart
              height={320}
              xAxis={[
                {
                  scaleType: "point",
                  data: ["2022", "2023", "2024", "2025", "2026"],
                },
              ]}
              series={[
                {
                  data: [48, 58, 67, 79, 90],
                  label: "Software + AI",
                  color: chartPalette[0],
                },
                {
                  data: [34, 41, 52, 63, 74],
                  label: "Electrical + energy systems",
                  color: chartPalette[2],
                },
                {
                  data: [37, 44, 51, 57, 66],
                  label: "Mechanical + infra engineering",
                  color: chartPalette[3],
                },
                {
                  data: [61, 52, 42, 30, 21],
                  label: "Routine digital work",
                  color: chartPalette[5],
                },
              ]}
              grid={{ horizontal: true }}
              sx={chartSx()}
            />
          </Card>
          <Card
            title="Global reach"
            subtitle="Technology is highly exportable, but engineering paths split between remote-friendly and location-tied work."
            className="lg:col-span-4"
          >
            <div className="flex items-center justify-center">
              <Gauge
                width={260}
                height={250}
                value={86}
                startAngle={-110}
                endAngle={110}
              />
            </div>
            <p className="text-center text-sm leading-6 text-zinc-600">
              Software tends to travel globally faster, while energy,
              manufacturing, and infrastructure engineering stay more project
              and site dependent.
            </p>
          </Card>
          <Card
            title="Top technology demand"
            subtitle="Broader engineering is included here, not just IT roles."
            className="lg:col-span-7"
          >
            <BarChart
              height={300}
              xAxis={[{ scaleType: "band", data: demandItems.slice(0, 4) }]}
              series={[{ data: [92, 84, 77, 71], color: chartPalette[0] }]}
              yAxis={[{ min: 0, max: 100 }]}
              grid={{ horizontal: true }}
              sx={chartSx()}
            />
          </Card>
          <Card
            title="Skill stack"
            subtitle="Technology now rewards a hybrid mix of digital and engineering systems skill."
            className="lg:col-span-5"
          >
            <ScatterChart
              height={300}
              series={[
                {
                  label: "Tech skill intensity",
                  data: currentSkills.map((skill, index) => ({
                    x: index + 1,
                    y: skill.score,
                    id: index,
                  })),
                  color: chartPalette[0],
                },
              ]}
              xAxis={[{ min: 0, max: 5 }]}
              yAxis={[{ min: 40, max: 100 }]}
              sx={chartSx()}
            />
          </Card>
          <Card
            title={`Source-backed ${sectorTitle} read`}
            subtitle="Current evidence behind this sector's direction."
            className="lg:col-span-12"
          >
            <InsightList
              items={evidenceItems.map((item) => ({
                title: item.title,
                text: `${item.text} ${item.source}.`,
              }))}
            />
          </Card>
        </div>
      );
    case "design":
    case "media-entertainment":
      return (
        <div className="grid gap-6 lg:grid-cols-12">
          <Card
            title="Design work mix"
            subtitle="Design demand now spans UI/UX, digital interfaces, motion, brand systems, and product-linked design, not only static graphics."
            className="lg:col-span-5"
          >
            <PieChart
              height={320}
              colors={chartPalette}
              series={[
                {
                  innerRadius: 44,
                  outerRadius: 110,
                  data: [
                    { id: 0, value: 34, label: "UI/UX + digital" },
                    { id: 1, value: 24, label: "Brand systems" },
                    { id: 2, value: 18, label: "Motion / animation" },
                    { id: 3, value: 14, label: "Industrial / product" },
                    { id: 4, value: 10, label: "Print legacy" },
                  ],
                },
              ]}
              sx={chartSx()}
            />
          </Card>
          <Card
            title="Portfolio vs remote fit"
            subtitle="Design is still filtered by proof of work, but remote suitability changes a lot by subfield."
            className="lg:col-span-7"
          >
            <ScatterChart
              height={320}
              series={[
                {
                  label: "Roles",
                  data: [
                    { id: 0, x: 92, y: 81 },
                    { id: 1, x: 84, y: 73 },
                    { id: 2, x: 76, y: 62 },
                    { id: 3, x: 68, y: 44 },
                    { id: 4, x: 42, y: 20 },
                  ],
                  color: chartPalette[0],
                },
              ]}
              xAxis={[{ min: 0, max: 100, label: "Portfolio importance" }]}
              yAxis={[{ min: 0, max: 100, label: "Remote suitability" }]}
              sx={chartSx()}
            />
          </Card>
          <Card
            title={`Source-backed ${sectorTitle} read`}
            subtitle="Current evidence behind this sector's direction."
            className="lg:col-span-12"
          >
            <InsightList
              items={evidenceItems.map((item) => ({
                title: item.title,
                text: `${item.text} ${item.source}.`,
              }))}
            />
          </Card>
        </div>
      );
    case "marketing":
    case "sales-marketing":
      return (
        <div className="grid gap-6 lg:grid-cols-12">
          <Card
            title="Channel momentum"
            subtitle="Marketing is shifting from campaign-heavy work to data-backed acquisition, lifecycle systems, and creator-led distribution."
            className="lg:col-span-8"
          >
            <LineChart
              height={320}
              xAxis={[
                {
                  scaleType: "point",
                  data: ["2022", "2023", "2024", "2025", "2026"],
                },
              ]}
              series={[
                {
                  data: [38, 49, 61, 74, 86],
                  label: "Performance / acquisition",
                  color: chartPalette[0],
                },
                {
                  data: [24, 36, 49, 66, 82],
                  label: "Creator / content systems",
                  color: chartPalette[3],
                },
                {
                  data: [33, 41, 52, 63, 73],
                  label: "Research + analytics",
                  color: chartPalette[2],
                },
                {
                  data: [69, 60, 51, 42, 34],
                  label: "Traditional campaign-only work",
                  color: chartPalette[5],
                },
              ]}
              grid={{ horizontal: true }}
              sx={chartSx()}
            />
          </Card>
          <Card
            title="Skill mix"
            subtitle="Marketing value now sits across analysis, messaging, lifecycle systems, and tool fluency."
            className="lg:col-span-4"
          >
            <PieChart
              height={320}
              colors={chartPalette}
              series={[
                {
                  innerRadius: 46,
                  outerRadius: 110,
                  data: currentSkills.map((skill, index) => ({
                    id: index,
                    value: skill.score,
                    label: skill.label,
                  })),
                },
              ]}
              sx={chartSx()}
            />
          </Card>
          <Card
            title="Role demand"
            subtitle="The strongest roles combine audience understanding with measurable business impact."
            className="lg:col-span-7"
          >
            <BarChart
              height={300}
              xAxis={[{ scaleType: "band", data: demandItems.slice(0, 5) }]}
              series={[{ data: [88, 82, 77, 72, 67], color: chartPalette[0] }]}
              yAxis={[{ min: 0, max: 100 }]}
              grid={{ horizontal: true }}
              sx={chartSx()}
            />
          </Card>
          <Card
            title="Funnel value"
            subtitle="Modern marketing teams reward operators who can move across awareness, conversion, and retention."
            className="lg:col-span-5"
          >
            <BarChart
              height={300}
              layout="horizontal"
              yAxis={[
                {
                  scaleType: "band",
                  data: [
                    "Awareness",
                    "Consideration",
                    "Conversion",
                    "Retention",
                  ],
                },
              ]}
              xAxis={[{ min: 0, max: 100 }]}
              series={[{ data: [62, 71, 84, 76], color: chartPalette[3] }]}
              grid={{ vertical: true }}
              sx={chartSx()}
            />
          </Card>
          <Card
            title={`Source-backed ${sectorTitle} read`}
            subtitle="Current evidence behind this sector's direction."
            className="lg:col-span-12"
          >
            <InsightList
              items={evidenceItems.map((item) => ({
                title: item.title,
                text: `${item.text} ${item.source}.`,
              }))}
            />
          </Card>
        </div>
      );
    case "business":
    case "banking-finance":
    case "business-entrepreneurship":
    case "legal-law":
      return (
        <div className="grid gap-6 lg:grid-cols-12">
          <Card
            title="Business role demand"
            subtitle="Business demand is increasingly concentrated in analysis, project delivery, and operations that move outcomes."
            className="lg:col-span-7"
          >
            <BarChart
              height={320}
              xAxis={[{ scaleType: "band", data: demandItems.slice(0, 5) }]}
              series={[{ data: [86, 81, 74, 69, 62], color: chartPalette[2] }]}
              yAxis={[{ min: 0, max: 100 }]}
              grid={{ horizontal: true }}
              sx={chartSx()}
            />
          </Card>
          <Card
            title="Operating leverage"
            subtitle="Relationships still matter, but execution quality is becoming the stronger filter."
            className="lg:col-span-5"
          >
            <div className="flex items-center justify-center">
              <Gauge
                width={260}
                height={250}
                value={72}
                startAngle={-110}
                endAngle={110}
              />
            </div>
          </Card>
          <Card
            title="Stability curve"
            subtitle="Business tracks usually compound more steadily than creator-style work, especially in operations and analysis."
            className="lg:col-span-12"
          >
            <LineChart
              height={300}
              xAxis={[
                {
                  scaleType: "point",
                  data: ["Entry", "Year 1", "Year 2", "Year 3", "Year 4"],
                },
              ]}
              series={[
                {
                  data: [41, 52, 63, 72, 79],
                  label: "Operations / analysis path",
                  color: chartPalette[2],
                },
                {
                  data: [33, 37, 43, 48, 56],
                  label: "Relationship-led generalist path",
                  color: chartPalette[3],
                },
                {
                  data: [29, 31, 36, 42, 51],
                  label: "Legacy admin path",
                  color: chartPalette[5],
                },
              ]}
              grid={{ horizontal: true }}
              sx={chartSx()}
            />
          </Card>
          <Card
            title={`Source-backed ${sectorTitle} read`}
            subtitle="Current evidence behind this sector's direction."
            className="lg:col-span-12"
          >
            <InsightList
              items={evidenceItems.map((item) => ({
                title: item.title,
                text: `${item.text} ${item.source}.`,
              }))}
            />
          </Card>
        </div>
      );
    case "health":
      return (
        <div className="grid gap-6 lg:grid-cols-12">
          <Card
            title="Health role demand"
            subtitle="Health is one of the steadiest sectors because care demand compounds with demographics and system need."
            className="lg:col-span-7"
          >
            <BarChart
              height={320}
              xAxis={[{ scaleType: "band", data: demandItems.slice(0, 5) }]}
              series={[{ data: [94, 84, 76, 69, 63], color: chartPalette[2] }]}
              yAxis={[{ min: 0, max: 100 }]}
              grid={{ horizontal: true }}
              sx={chartSx()}
            />
          </Card>
          <Card
            title="Work composition"
            subtitle="Health demand spans direct care, advanced practice, diagnostics, and digitally supported coordination."
            className="lg:col-span-5"
          >
            <PieChart
              height={320}
              colors={chartPalette}
              series={[
                {
                  data: [
                    { id: 0, value: 38, label: "Direct care" },
                    { id: 1, value: 24, label: "Advanced practice" },
                    { id: 2, value: 20, label: "Diagnostics / tech" },
                    { id: 3, value: 18, label: "Records + workflow" },
                  ],
                },
              ]}
              sx={chartSx()}
            />
          </Card>
          <Card
            title="Demand stability"
            subtitle="Health behaves more like a durable slope than a short-cycle spike."
            className="lg:col-span-12"
          >
            <LineChart
              height={300}
              xAxis={[
                {
                  scaleType: "point",
                  data: ["2022", "2023", "2024", "2025", "2026"],
                },
              ]}
              series={[
                {
                  data: [62, 66, 71, 76, 82],
                  label: "Clinical + advanced care demand",
                  color: chartPalette[2],
                },
                {
                  data: [47, 53, 59, 64, 71],
                  label: "Digital health support",
                  color: chartPalette[1],
                },
                {
                  data: [35, 33, 31, 27, 24],
                  label: "Paper-admin handling",
                  color: chartPalette[5],
                },
              ]}
              grid={{ horizontal: true }}
              sx={chartSx()}
            />
          </Card>
          <Card
            title={`Source-backed ${sectorTitle} read`}
            subtitle="Current evidence behind this sector's direction."
            className="lg:col-span-12"
          >
            <InsightList
              items={evidenceItems.map((item) => ({
                title: item.title,
                text: `${item.text} ${item.source}.`,
              }))}
            />
          </Card>
        </div>
      );
    case "education":
      return (
        <div className="grid gap-6 lg:grid-cols-12">
          <Card
            title="Delivery shift"
            subtitle="Education is moving from classroom-only delivery to hybrid, online, coaching, and skills-based formats."
            className="lg:col-span-8"
          >
            <LineChart
              height={320}
              xAxis={[
                {
                  scaleType: "point",
                  data: ["2022", "2023", "2024", "2025", "2026"],
                },
              ]}
              series={[
                {
                  data: [31, 39, 52, 63, 77],
                  label: "Digital delivery",
                  color: chartPalette[0],
                },
                {
                  data: [47, 51, 54, 58, 62],
                  label: "Coaching / training",
                  color: chartPalette[3],
                },
                {
                  data: [44, 49, 56, 63, 71],
                  label: "Higher education demand",
                  color: chartPalette[2],
                },
                {
                  data: [74, 68, 61, 54, 45],
                  label: "Theory-only formats",
                  color: chartPalette[5],
                },
              ]}
              grid={{ horizontal: true }}
              sx={chartSx()}
            />
          </Card>
          <Card
            title="Role demand"
            subtitle="Teaching plus training and instructional design is where the mix is heading."
            className="lg:col-span-4"
          >
            <BarChart
              height={320}
              xAxis={[{ scaleType: "band", data: demandItems.slice(0, 5) }]}
              series={[{ data: [84, 77, 71, 65, 52], color: chartPalette[0] }]}
              yAxis={[{ min: 0, max: 100 }]}
              grid={{ horizontal: true }}
              sx={chartSx()}
            />
          </Card>
          <Card
            title="Learning model mix"
            subtitle="The sector now blends formal teaching, training, and design of learning experiences."
            className="lg:col-span-12"
          >
            <PieChart
              height={300}
              colors={chartPalette}
              series={[
                {
                  innerRadius: 40,
                  outerRadius: 108,
                  data: [
                    { id: 0, value: 31, label: "Postsecondary teaching" },
                    { id: 1, value: 26, label: "Online teaching" },
                    { id: 2, value: 22, label: "Training" },
                    { id: 3, value: 13, label: "Learning design" },
                    { id: 4, value: 8, label: "Traditional-only delivery" },
                  ],
                },
              ]}
              sx={chartSx()}
            />
          </Card>
          <Card
            title={`Source-backed ${sectorTitle} read`}
            subtitle="Current evidence behind this sector's direction."
            className="lg:col-span-12"
          >
            <InsightList
              items={evidenceItems.map((item) => ({
                title: item.title,
                text: `${item.text} ${item.source}.`,
              }))}
            />
          </Card>
        </div>
      );
    case "infrastructure":
    case "engineering-construction":
    case "transport-logistics":
    case "manufacturing-production":
    case "energy-hydropower":
      return (
        <div className="grid gap-6 lg:grid-cols-12">
          <Card
            title="Opportunity zones"
            subtitle="Infrastructure is project-led, tied to civil systems, facilities, logistics, and energy build-out rather than short-cycle hype."
            className="lg:col-span-7"
          >
            <BarChart
              height={320}
              xAxis={[{ scaleType: "band", data: demandItems.slice(0, 5) }]}
              series={[{ data: [82, 74, 68, 63, 57], color: chartPalette[3] }]}
              yAxis={[{ min: 0, max: 100 }]}
              grid={{ horizontal: true }}
              sx={chartSx()}
            />
          </Card>
          <Card
            title="Local access"
            subtitle="Opportunity depends more on geography, projects, and physical investment cycles than digital sectors do."
            className="lg:col-span-5"
          >
            <div className="flex items-center justify-center">
              <Gauge
                width={260}
                height={250}
                value={54}
                startAngle={-110}
                endAngle={110}
              />
            </div>
          </Card>
          <Card
            title="Project horizon"
            subtitle="Infrastructure compounds over longer cycles than digital sectors, especially in civil and energy systems."
            className="lg:col-span-12"
          >
            <LineChart
              height={300}
              xAxis={[
                {
                  scaleType: "point",
                  data: ["Phase 1", "Phase 2", "Phase 3", "Phase 4", "Phase 5"],
                },
              ]}
              series={[
                {
                  data: [26, 39, 52, 63, 74],
                  label: "Civil + facilities growth",
                  color: chartPalette[3],
                },
                {
                  data: [34, 45, 56, 68, 81],
                  label: "Energy + grid demand",
                  color: chartPalette[2],
                },
                {
                  data: [51, 47, 42, 37, 31],
                  label: "Unskilled dependency",
                  color: chartPalette[5],
                },
              ]}
              grid={{ horizontal: true }}
              sx={chartSx()}
            />
          </Card>
          <Card
            title={`Source-backed ${sectorTitle} read`}
            subtitle="Current evidence behind this sector's direction."
            className="lg:col-span-12"
          >
            <InsightList
              items={evidenceItems.map((item) => ({
                title: item.title,
                text: `${item.text} ${item.source}.`,
              }))}
            />
          </Card>
        </div>
      );
    case "other":
    case "tourism-hospitality":
    case "freelancing-remote":
    case "security-services":
      return (
        <div className="grid gap-6 lg:grid-cols-12">
          <Card
            title={serviceSectorConfig.scatterTitle}
            subtitle={serviceSectorConfig.scatterSubtitle}
            className="lg:col-span-7"
          >
            <ScatterChart
              height={320}
              series={[
                {
                  label: "Niche sectors",
                  data: [
                    { id: 0, x: 82, y: 78 },
                    { id: 1, x: 72, y: 81 },
                    { id: 2, x: 61, y: 69 },
                    { id: 3, x: 48, y: 55 },
                    { id: 4, x: 36, y: 33 },
                  ],
                  color: chartPalette[0],
                },
              ]}
              xAxis={[
                { min: 0, max: 100, label: serviceSectorConfig.xAxisLabel },
              ]}
              yAxis={[
                { min: 0, max: 100, label: serviceSectorConfig.yAxisLabel },
              ]}
              sx={chartSx()}
            />
          </Card>
          <Card
            title={serviceSectorConfig.pieTitle}
            subtitle={serviceSectorConfig.pieSubtitle}
            className="lg:col-span-5"
          >
            <PieChart
              height={320}
              colors={chartPalette}
              series={[
                {
                  data: serviceSectorConfig.pieData,
                },
              ]}
              sx={chartSx()}
            />
          </Card>
          <Card
            title="Demand leaders"
            subtitle="The stronger paths here are specialization-led rather than broad and generic."
            className="lg:col-span-12"
          >
            <BarChart
              height={300}
              xAxis={[{ scaleType: "band", data: demandItems.slice(0, 5) }]}
              series={[{ data: [76, 70, 63, 58, 46], color: chartPalette[1] }]}
              yAxis={[{ min: 0, max: 100 }]}
              grid={{ horizontal: true }}
              sx={chartSx()}
            />
          </Card>
          <Card
            title={`Source-backed ${sectorTitle} read`}
            subtitle="Current evidence behind this sector's direction."
            className="lg:col-span-12"
          >
            <InsightList
              items={evidenceItems.map((item) => ({
                title: item.title,
                text: `${item.text} ${item.source}.`,
              }))}
            />
          </Card>
        </div>
      );
    default:
      return null;
  }
}
