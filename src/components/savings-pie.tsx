import dynamic from 'next/dynamic';

const ResponsivePie = dynamic(
  () => import('@nivo/pie').then((m) => m.ResponsivePie),
  { ssr: false }
);

const pieChartData: { id: string; value: number }[] = [
  { id: 'Ordinary Account', value: 49602.38 },
  { id: 'Medical Account', value: 17253 },
  { id: 'Special Account', value: 12939.75 },
  { id: 'Retirement Account', value: 34265.64 },
];
export default function SavingsPie() {
  return (
    <ResponsivePie
      data={pieChartData}
      margin={{ top: 40, right: 160, bottom: 80, left: 160 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderWidth={1}
      borderColor={{
        from: 'color',
        modifiers: [['darker', 0.2]],
      }}
      colors={{ scheme: 'pastel1' }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor='#333333'
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: 'color' }}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{
        from: 'color',
        modifiers: [['darker', 2]],
      }}
      defs={[
        {
          id: 'dots',
          type: 'patternDots',
          background: 'inherit',
          color: 'rgba(255, 255, 255, 0.3)',
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: 'lines',
          type: 'patternLines',
          background: 'inherit',
          color: 'rgba(255, 255, 255, 0.3)',
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      legends={[
        {
          anchor: 'bottom',
          direction: 'column',
          justify: false,
          translateX: 0,
          translateY: 40,
          itemsSpacing: 4,
          itemWidth: 100,
          itemHeight: 18,
          itemTextColor: '#999',
          itemDirection: 'left-to-right',
          itemOpacity: 1,
          symbolSize: 18,
          symbolShape: 'circle',
          effects: [
            {
              on: 'hover',
              style: {
                itemTextColor: '#000',
              },
            },
          ],
        },
      ]}
    />
  );
}
