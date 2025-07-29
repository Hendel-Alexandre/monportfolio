import { z } from "zod";

// GitHub repository schema
export const GitHubRepoSchema = z.object({
  id: z.number(),
  name: z.string(),
  full_name: z.string(),
  description: z.string().nullable(),
  html_url: z.string(),
  homepage: z.string().nullable(),
  language: z.string().nullable(),
  stargazers_count: z.number(),
  forks_count: z.number(),
  topics: z.array(z.string()),
  created_at: z.string(),
  updated_at: z.string(),
  pushed_at: z.string(),
  size: z.number(),
  private: z.boolean(),
  fork: z.boolean(),
});

export type GitHubRepo = z.infer<typeof GitHubRepoSchema>;

export class GitHubService {
  private baseUrl = 'https://api.github.com';
  private token?: string;

  constructor(token?: string) {
    this.token = token;
  }

  private getHeaders() {
    const headers: Record<string, string> = {
      'Accept': 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'User-Agent': 'Hendel-Portfolio-Website'
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    return headers;
  }

  async getUserRepositories(username: string, options: {
    sort?: 'created' | 'updated' | 'pushed' | 'full_name';
    direction?: 'asc' | 'desc';
    per_page?: number;
    type?: 'all' | 'owner' | 'member';
  } = {}): Promise<GitHubRepo[]> {
    try {
      const {
        sort = 'updated',
        direction = 'desc',
        per_page = 30,
        type = 'owner'
      } = options;

      const params = new URLSearchParams({
        sort,
        direction,
        per_page: per_page.toString(),
        type
      });

      const url = `${this.baseUrl}/users/${username}/repos?${params}`;
      
      const response = await fetch(url, {
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      // Validate and filter the data
      const repos = data
        .map((repo: any) => {
          try {
            return GitHubRepoSchema.parse(repo);
          } catch (error) {
            console.warn(`Invalid repository data for ${repo.name}:`, error);
            return null;
          }
        })
        .filter((repo: GitHubRepo | null): repo is GitHubRepo => repo !== null)
        .filter((repo: GitHubRepo) => !repo.fork) // Filter out forked repositories
        .filter((repo: GitHubRepo) => !repo.private); // Only public repos for display

      return repos;
    } catch (error) {
      console.error('Error fetching GitHub repositories:', error);
      throw error;
    }
  }

  async getRepository(username: string, repoName: string): Promise<GitHubRepo> {
    try {
      const url = `${this.baseUrl}/repos/${username}/${repoName}`;
      
      const response = await fetch(url, {
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return GitHubRepoSchema.parse(data);
    } catch (error) {
      console.error(`Error fetching repository ${username}/${repoName}:`, error);
      throw error;
    }
  }

  async getLatestRepositories(username: string, limit: number = 6): Promise<GitHubRepo[]> {
    const repos = await this.getUserRepositories(username, {
      sort: 'updated',
      direction: 'desc',
      per_page: limit * 2, // Fetch more to account for filtering
    });

    return repos.slice(0, limit);
  }
}

// Export a default instance
export const githubService = new GitHubService(process.env.GITHUB_TOKEN);