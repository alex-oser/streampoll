import clsx from 'clsx';

export const PollOption = (props: any) => {
    const { title, description, isActive = true, style } = props;
  
    return (
      <div
        style={style}
        onClick={props.onClick}
        className={clsx("poll-option-base", { "poll-option-active":isActive })}
      >
        <div className="auto-flex">
          <div
            className={clsx("poll-option-title-i12 valign-text-middle", { "roboto-normal-white-24px":isActive, "roboto-normal-storm-dust-24px": ! isActive })}
          >
            {title}
          </div>
          <div
            className={clsx("poll-option-title-i12 valign-text-middle", { "roboto-normal-white-18px":isActive, "roboto-normal-storm-dust-18px": ! isActive })}
          >
            {description}
          </div>
        </div>
      </div>
    );
  };