export function TabPanel(props: any) {
  const { children, value, index, style } = props;

  return (
    <div
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      style={{
        ...style,
        display: "flex",
        flexDirection: "column",
        overflowY: "auto",
      }}
    >
      {value === index && children}
    </div>
  );
}
