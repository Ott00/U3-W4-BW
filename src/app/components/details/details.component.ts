import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';
import { Post } from 'src/app/models/post';
import { Comment } from 'src/app/models/comment';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  post: Post | undefined
  id!: number
  posts: Post[] = [];
  comments: Comment[] = []
  commentPost: Comment[] = []


  constructor(private postSrv: PostsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.takeId()
    this.getPostDetail()
    this.getComments()
  }

  getPostDetail(){
    this.postSrv.getPosts().subscribe((post: Post[]) => {
      this.posts = post
      this.post = this.posts.find(element => element.id === this.id)
      console.log(this.post);
      
    })
  }

  getComments(){
    this.postSrv.getComments().subscribe((comment: Comment[] )=> {
      this.comments = comment
      console.log(this.comments);
      this.commentPost = (this.comments.filter((element: Comment) => element.postId === this.id))
      console.log(this.commentPost);
    })
  }

  takeId(){
    this.route.params.subscribe(parm =>{
      this.id = +parm['id']
      console.log(this.id);
  })
  }

}
