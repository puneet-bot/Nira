{
    let createPost = function () {
        let postForm = $('#new-form-post');
        postForm.submit(function (e) {
            //preventing default actions

            e.preventDefault();
            $.ajax({
                type: 'post',
                url: '/post/create',
                data: postForm.serialize(),
                success: function (data) {
                    let newPostData = newPost(data.data.post);
                    $(' #post-container').prepend(newPostData);
                    // //mentioning that this class is under newPostData in jquery...
                    deletePost($('.delete-post-button'));
                    addComments(data.data.post._id);
                }, error: function (error) {
                    console.log(error.responseText);
                }
            })
        });
    }

    let newPost = function (posts) {
        return $(`
        <div id="post-${posts._id}">
            <a href="/post/destroy/${posts._id}"><button>Delete Post</button></a>
        <div>${posts.post}</div>
        <div>Created By - ${posts.user.name}</div>
        <form action="/comment/create" method="post" class="new-comment-form">
            <input type="text" name="comment" placeholder="Add your Comment">
            <input type="hidden" name="postId" value="${posts._id}">
            <input type="submit" value="Post">
        </form>
            <div id="comments-container"></div>
    </div>
        `);
    }
    let deletePost = function (deleteLink) {
        $(deleteLink).click(function (e) {
            e.preventDefault();
            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function (data) {
                    $(`#post-${data.data.post_id}`).remove();
                }, error: function (error) {
                    console.log(error.responseText);
                }
            })
        })
    }

    let addComments = function (id) {
        let createComments = $(`#post-${id}> .new-comment-form`);
        createComments.submit(function (e) {
            e.preventDefault();
            $.ajax({
                type: 'post',
                url: 'comment/create',
                data: createComments.serialize(),
                success: function (data) {
                    let postNewCommentdata = newComment(data.data.comment);
                    $(`#post-${data.data.comment.post._id} > #comments-container`).prepend(postNewCommentdata);
                    deleteComment($(`#my-comment-${data.data.comment._id}> .delete-comment-button`))
                }, error: function (error) {
                    console.log(error.responseText);
                }
            })
        })
    }


    let newComment = function (comments) {
        return $(
            `
            <div id="my-comment-${comments._id}">
                <a href="/comment/destroy/${comments._id}" class="delete-comment-button"><button>Delete Comment</button></a>
                <div></div>
                <div>${ comments.content } - [Posted by${comments.user.name}]</div>
            </div>
            `
        )
    }

    let deleteComment = function (deleteLink) {
        $(deleteLink).click(function (e) {
            e.preventDefault();
            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function (data) {
                    $(`#my-comment-${data.data.comment_id}`).remove();
                }, error: function (error) {
                    console.log(error.responseText);
                }
            })
        })
    }
    let populate_all_delete = function () {
        let i=0;
        $('#post-container>div').each(function () {
            let element = $(this);
            let posstId = $(this).prop('id').split("post-")[1];
            addComments(posstId);
            let all_posts = $(`#post-container> #post-${posstId}>a`);
            deletePost(all_posts);
            let all_comments=$(`#post-container>#post-${posstId}> #comments-container>div`);
            all_comments.each(function(){
                var doc = $(this).innerHTML;
                let postId = $(this).prop('id').split("my-comment-")[1];
                let yaya=$(`#post-container>#post-${posstId}>#comments-container>#my-comment-${postId}>a`);
                deleteComment(yaya);
            });
        })
    }


    createPost();
    populate_all_delete();
    // populate_all_comment_delete();
}

