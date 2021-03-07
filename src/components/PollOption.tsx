export const PollOption = (props: any) => {
    const { title, description, isActive = true, style } = props;
  
    return (
      <div
        style={style}
        onClick={props.onClick}
        className={
          "poll-option-inactive " +
          (isActive === true ? "poll-option-active" : "")
        }
      >
        <div
          className={
            isActive === true
              ? "poll-option-active-accent"
              : "poll-option-inactive-accent"
          }
        ></div>
        <div className="auto-flex">
          <div
            className={
              "poll-option-title-i12 valign-text-middle " +
              (isActive === true
                ? "roboto-normal-white-24px"
                : "roboto-normal-storm-dust-24px")
            }
          >
            {title}
          </div>
          <div
            className={
              "poll-option-text-i12 valign-text-middle " +
              (isActive === true
                ? "roboto-normal-white-18px"
                : "roboto-normal-storm-dust-18px")
            }
          >
            {description}
          </div>
        </div>
      </div>
    );
  };