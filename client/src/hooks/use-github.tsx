import { useQuery } from "@tanstack/react-query";

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  created_at: string;
  updated_at: string;
  pushed_at: string;
  size: number;
  private: boolean;
  fork: boolean;
}

export function useGitHubRepositories(username: string, limit?: number) {
  return useQuery({
    queryKey: ['github-repos', username, limit],
    queryFn: async (): Promise<GitHubRepo[]> => {
      const params = new URLSearchParams();
      if (limit) {
        params.append('limit', limit.toString());
      }
      
      const response = await fetch(`/api/github/repos/${username}?${params}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch repositories: ${response.statusText}`);
      }
      
      return response.json();
    },
    staleTime: 1000 * 60 * 10, // 10 minutes
    retry: 2,
  });
}

export function useGitHubRepository(username: string, repoName: string) {
  return useQuery({
    queryKey: ['github-repo', username, repoName],
    queryFn: async (): Promise<GitHubRepo> => {
      const response = await fetch(`/api/github/repo/${username}/${repoName}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch repository: ${response.statusText}`);
      }
      
      return response.json();
    },
    staleTime: 1000 * 60 * 15, // 15 minutes
    retry: 2,
  });
}