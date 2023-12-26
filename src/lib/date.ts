

export function timeSincePosted(postedDate:Date):string {
    const currentDate = new Date();
    const difference = Math.floor((new Date(currentDate).getTime() - new Date(postedDate).getTime()) / 1000); // Difference in seconds
  
    if (difference < 60) {
      return 'less than a minute ago';
    } else if (difference < 3600) {
      const minutes = Math.floor(difference / 60);
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else if (difference < 86400) {
      const hours = Math.floor(difference / 3600);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (difference < 31536000) {
      const days = Math.floor(difference / 86400);
      return `${days} day${days > 1 ? 's' : ''} ago`;
    } else {
      const years = Math.floor(difference / 31536000);
      return `${years} year${years > 1 ? 's' : ''} ago`;
    }
}