// blog.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  faArrowRight,
  faHeart,
  faComment,
  faBookmark
} from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

interface Author {
  name: string;
  role: string;
  avatar: string;
}

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  date: Date;
  author: Author;
  likes: number;
  comments: number;
  readTime: number;
  tags: string[];
}

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, FaIconComponent],
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  // Icons
  faArrowRight = faArrowRight;
  faHeart = faHeart;
  faComment = faComment;
  faBookmark = faBookmark;

  // Filter
  categories: string[] = ['All', 'Career Advice', 'Industry Insights', 'Technology', 'Leadership', 'Workplace'];
  selectedCategory: string = 'All';

  // Pagination
  allPostsLoaded: boolean = false;
  currentPage: number = 1;
  postsPerPage: number = 9;

  // Featured Post
  featuredPost: BlogPost = {
    id: 1,
    title: 'The Future of Work: AI and Human Collaboration in 2024',
    excerpt: 'Discover how artificial intelligence is reshaping the workplace and creating new opportunities for human-AI collaboration across various industries.',
    content: '',
    image: 'assets/blog/featured.jpg',
    category: 'Industry Insights',
    date: new Date('2024-01-20'),
    author: {
      name: 'Sarah Johnson',
      role: 'Tech Industry Analyst',
      avatar: 'assets/authors/sarah.jpg'
    },
    likes: 245,
    comments: 56,
    readTime: 8,
    tags: ['AI', 'Future of Work', 'Technology']
  };

  // Blog Posts
  blogPosts: BlogPost[] = [
    {
      id: 2,
      title: 'Top 10 In-Demand Tech Skills for 2024',
      excerpt: 'Stay ahead of the curve with these must-have technical skills that employers are looking for in the current job market.',
      content: '',
      image: 'assets/blog/tech-skills.jpg',
      category: 'Career Advice',
      date: new Date('2024-01-18'),
      author: {
        name: 'Michael Chen',
        role: 'Senior Developer',
        avatar: 'assets/authors/michael.jpg'
      },
      likes: 182,
      comments: 43,
      readTime: 6,
      tags: ['Skills', 'Technology', 'Career Growth']
    },
    {
      id: 3,
      title: 'Building a Strong Personal Brand on LinkedIn',
      excerpt: 'Learn effective strategies to enhance your professional presence and attract better career opportunities.',
      content: '',
      image: 'assets/blog/personal-brand.jpg',
      category: 'Career Advice',
      date: new Date('2024-01-15'),
      author: {
        name: 'Emma Williams',
        role: 'Career Coach',
        avatar: 'assets/authors/emma.jpg'
      },
      likes: 156,
      comments: 38,
      readTime: 5,
      tags: ['Personal Branding', 'LinkedIn', 'Networking']
    },
    // Add more mock posts here...
  ];

  filteredPosts: BlogPost[] = [];

  ngOnInit() {
    this.filteredPosts = this.blogPosts; // Inicializa com todos os posts
  }

  filterByCategory(category: string) {
    this.selectedCategory = category;

    if (category === 'All') {
      this.filteredPosts = this.blogPosts; // Mostra todos os posts
    } else {
      this.filteredPosts = this.blogPosts.filter(post => post.category === category);
    }
  }

  loadMore() {
    // Simulate loading more posts
    const newPosts: BlogPost[] = [
      // Add more mock posts here
    ];

    this.blogPosts = [...this.blogPosts, ...newPosts];
    this.filterByCategory(this.selectedCategory);

    // Simulate end of posts
    if (this.currentPage >= 3) {
      this.allPostsLoaded = true;
    } else {
      this.currentPage++;
    }
  }
}
