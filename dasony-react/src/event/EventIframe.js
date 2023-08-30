export default () => {
    const buildIframe = () => {
        return {
            __html : '<iframe src="./event-detail.html" width="100%" height="100%"></iframe>'
        };
    }

    return(
        <div dangerouslySetInnerHTML={buildIframe()}/>
    );
}