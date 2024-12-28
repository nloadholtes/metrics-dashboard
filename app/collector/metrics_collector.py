import os
from datetime import datetime, timedelta
import requests
import pandas as pd
from notion_client import Client
from todoist_api_python.api import TodoistAPI
from linkedin_api import Linkedin

class MetricsCollector:
    def __init__(self):
        # Initialize API clients
        self.todoist = TodoistAPI(os.getenv('TODOIST_API_KEY'))
        self.notion = Client(auth=os.getenv('NOTION_TOKEN'))
        self.toggl = os.getenv('TOGGL_API_KEY')
        self.github_token = os.getenv('GITHUB_TOKEN')
        
        # LinkedIn requires email/password auth
        self.linkedin = Linkedin(os.getenv('LINKEDIN_EMAIL'), 
                               os.getenv('LINKEDIN_PASSWORD'))

    def get_todoist_metrics(self):
        """Collect Todoist productivity metrics"""
        try:
            tasks = self.todoist.get_tasks()
            completed = [t for t in tasks if t.is_completed]
            projects = self.todoist.get_projects()
            
            metrics = {
                'total_tasks': len(tasks),
                'completed_tasks': len(completed),
                'completion_rate': len(completed) / len(tasks) if tasks else 0,
                'projects_count': len(projects),
                'overdue_tasks': len([t for t in tasks if t.due and 
                                    datetime.fromisoformat(t.due.date) < datetime.now()])
            }
            return metrics
        except Exception as e:
            print(f"Error collecting Todoist metrics: {e}")
            return None

    def get_toggl_metrics(self):
        """Collect Toggl time tracking data"""
        headers = {'Authorization': f'Basic {self.toggl}'}
        
        # Get last 7 days of time entries
        end_date = datetime.now()
        start_date = end_date - timedelta(days=7)
        
        response = requests.get(
            'https://api.track.toggl.com/api/v8/time_entries',
            headers=headers,
            params={
                'start_date': start_date.isoformat(),
                'end_date': end_date.isoformat()
            }
        )
        
        if response.status_code == 200:
            entries = response.json()
            total_duration = sum(e['duration'] for e in entries if e['duration'] > 0)
            
            metrics = {
                'total_hours': total_duration / 3600,
                'entries_count': len(entries),
                'average_daily_hours': (total_duration / 3600) / 7
            }
            return metrics
        return None

    def get_github_activity(self):
        """Collect Github contribution data"""
        headers = {'Authorization': f'token {self.github_token}'}
        
        # Get user's events
        response = requests.get(
            'https://api.github.com/user/events',
            headers=headers
        )
        
        if response.status_code == 200:
            events = response.json()
            
            # Count different types of contributions
            push_events = len([e for e in events if e['type'] == 'PushEvent'])
            pr_events = len([e for e in events if e['type'] == 'PullRequestEvent'])
            issue_events = len([e for e in events if e['type'] == 'IssuesEvent'])
            
            metrics = {
                'total_contributions': len(events),
                'pushes': push_events,
                'pull_requests': pr_events,
                'issues': issue_events
            }
            return metrics
        return None

    def get_linkedin_metrics(self):
        """Collect LinkedIn profile and post metrics"""
        try:
            # Get profile views
            profile_views = self.linkedin.get_profile_views()
            
            # Get recent post statistics
            posts = self.linkedin.get_posts()  # Gets recent posts
            
            metrics = {
                'profile_views': profile_views['numViews'],
                'post_count': len(posts),
                'total_reactions': sum(post.get('numLikes', 0) for post in posts),
                'total_comments': sum(post.get('numComments', 0) for post in posts)
            }
            return metrics
        except Exception as e:
            print(f"Error collecting LinkedIn metrics: {e}")
            return None

    def get_notion_metrics(self):
        """Collect Notion database metrics"""
        try:
            # Assumes you have databases for clients and projects
            clients_db = self.notion.databases.query(
                database_id=os.getenv('NOTION_CLIENTS_DB_ID')
            )
            projects_db = self.notion.databases.query(
                database_id=os.getenv('NOTION_PROJECTS_DB_ID')
            )
            
            metrics = {
                'total_clients': len(clients_db['results']),
                'active_projects': len([p for p in projects_db['results'] 
                                     if p['properties'].get('Status', {}).get('select', {}).get('name') == 'Active']),
                'completed_projects': len([p for p in projects_db['results']
                                        if p['properties'].get('Status', {}).get('select', {}).get('name') == 'Completed'])
            }
            return metrics
        except Exception as e:
            print(f"Error collecting Notion metrics: {e}")
            return None

    def collect_all_metrics(self):
        """Collect all metrics and return combined dataset"""
        metrics = {
            'timestamp': datetime.now().isoformat(),
            'todoist': self.get_todoist_metrics(),
            'toggl': self.get_toggl_metrics(),
            'github': self.get_github_activity(),
            'linkedin': self.get_linkedin_metrics(),
            'notion': self.get_notion_metrics()
        }
        
        # Convert to DataFrame for easy storage/analysis
        df = pd.DataFrame([metrics])
        return df

def main():
    # Create collector and gather metrics
    collector = MetricsCollector()
    metrics_df = collector.collect_all_metrics()
    
    # Save to CSV with timestamp
    filename = f'metrics_{datetime.now().strftime("%Y%m%d")}.csv'
    metrics_df.to_csv(filename, index=False)
    
    print(f"Metrics collected and saved to {filename}")

if __name__ == "__main__":
    main()
