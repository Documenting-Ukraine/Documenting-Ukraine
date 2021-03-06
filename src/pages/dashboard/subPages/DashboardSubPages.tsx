import DashboardUserContributions from "./userContributions/DashboardUserContributions";
import DashboardReviewRequests from "./reviewRequests/DashboardReviewRequests";
const DashboardSubPages = ({
  subPageType,
}: {
  subPageType: "review-scopes" | "review-users" | "user-contributions";
    }) => {
    const subPageMap = {
        "review-scopes": <DashboardReviewRequests pageType={"review-scopes"}/>,
        "review-users": <DashboardReviewRequests pageType={"review-users"}/>,
        "user-contributions": <DashboardUserContributions />
    } 
    return (
        <>
            {subPageMap[subPageType]}
        </>
    )
};
export default DashboardSubPages;
