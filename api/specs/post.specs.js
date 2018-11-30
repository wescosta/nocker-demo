import "sinon-mongoose";
import sinon from "sinon";
import {expect} from "chai";
import request from "supertest";
import app from "../app";
import Post from "../model/post.model";

const api  = request(app);
const data = require('../data/prepopulate-data');

describe('Blog Posts rest API', () => {

    let PostMock, post

    beforeEach(() => {
        PostMock = sinon.mock(Post)

        post = {
            "_id":"5bfec4281a9bd4001f8ab8df",
            "title":"Anarchist Cookbook, The",
            "author":"Goldina Klimochkin",
            "markdown":"# In blandit ultrices enim.\nLorem ipsum dolor sit amet",
            "tags":["test"],
            "comments":[{"name": "some one", "body": "some text", "date":"2018-05-08T00:00:00.000Z"}],
            "date":"2018-05-08T00:00:00.000Z"
        }
    })

    afterEach(() => sinon.restore());

    it('GET /{id} should find and return a blog post by id', () => {
        PostMock
            .expects('findById')
            .withArgs(post._id)
            .callsArgWith(1, null, post)

        return api
            .get(`/${post._id}`)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                PostMock.verify()
                expect(response.body).to.eql(post)
            })
    })

    it('GET /{id} should return 404 HTTP status in case a blog post is not found', () => {
        let id = '0000000000000000'

        PostMock
            .expects('findById')
            .withArgs(id)
            .callsArgWith(1, null, null)

        return api
            .get(`/${id}`)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(404)
            .then(response => {
                PostMock.verify()
                expect(response.body).to.eql({})
            })
    })


    it('GET /{page}/{limit} should return a paginated list of blog posts', () => {
        let page   = 1,
            limit  = 3,
            paginated = {"docs":[{"tags":[],"_id":"5bfec4281a9bd4001f8ab8df","title":"Anarchist Cookbook, The","author":"Goldina Klimochkin","markdown":"# In blandit ultrices enim.\nLorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue.","date":"2018-06-11T00:00:00.000Z","comments":[{"_id":"5bfec4281a9bd4001f8ab8e2","author":"Virginie Castletine","body":"In est risus, auctor sed, tristique in, tempus sit amet, sem. Fusce consequat. Nulla nisl.","date":"2018-02-05T00:00:00.000Z"},{"_id":"5bfec4281a9bd4001f8ab8e1","author":"Osgood Prestige","body":"In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet. Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui. Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc.","date":"2018-07-30T00:00:00.000Z"},{"_id":"5bfec4281a9bd4001f8ab8e0","author":"Esta Strowther","body":"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl. Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.","date":"2018-05-08T00:00:00.000Z"}],"__v":0},{"tags":[],"_id":"5bfec4281a9bd4001f8ab8e3","title":"Wild Is the Wind","author":"Philipa Dugue","markdown":"# Phasellus id sapien in sapien iaculis congue.\nVivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl. Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum. Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est. Phasellus sit amet erat. Nulla tempus.","date":"2018-07-26T00:00:00.000Z","comments":[{"_id":"5bfec4281a9bd4001f8ab8e8","author":"Annora Staniforth","body":"Integer non velit. Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque. Duis bibendum. Morbi non quam nec dui luctus rutrum.","date":"2018-02-05T00:00:00.000Z"},{"_id":"5bfec4281a9bd4001f8ab8e7","author":"Aylmer Piborn","body":"Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem. Fusce consequat. Nulla nisl. Nunc nisl. Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum. In hac habitasse platea dictumst.","date":"2018-08-12T00:00:00.000Z"},{"_id":"5bfec4281a9bd4001f8ab8e6","author":"Dick Cornew","body":"Praesent lectus.","date":"2018-11-09T00:00:00.000Z"},{"_id":"5bfec4281a9bd4001f8ab8e5","author":"Corrie Barnshaw","body":"Maecenas pulvinar lobortis est. Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum. Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem. Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.","date":"2018-08-11T00:00:00.000Z"},{"_id":"5bfec4281a9bd4001f8ab8e4","author":"Samuel Gadesby","body":"Sed accumsan felis. Ut at dolor quis odio consequat varius. Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi. Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla.","date":"2018-10-23T00:00:00.000Z"}],"__v":0},{"tags":[],"_id":"5bfec4281a9bd4001f8ab8e9","title":"Interpreter, The","author":"Tatum Remirez","markdown":"# Quisque erat eros.\nNunc purus. Phasellus in felis.","date":"2018-03-06T00:00:00.000Z","comments":[{"_id":"5bfec4281a9bd4001f8ab8eb","author":"Sherri Wagge","body":"Donec posuere metus vitae ipsum. Aliquam non mauris. Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis. Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl.","date":"2017-12-17T00:00:00.000Z"},{"_id":"5bfec4281a9bd4001f8ab8ea","author":"Ginevra Repp","body":"Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem. Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat. Praesent blandit.","date":"2018-10-25T00:00:00.000Z"}],"__v":0}],"totalDocs":480,"limit":3,"hasPrevPage":false,"hasNextPage":true,"page":1,"totalPages":160,"prevPage":null,"nextPage":2};
        
        PostMock
            .expects('paginate')
            .withArgs({}, {page, limit})
            .callsArgWith(2, null, paginated)

        return api
            .get(`/${page}/${limit}`)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                PostMock.verify()
                expect(response.body).to.eql(paginated)
            })
    })

    it('GET /{page}/{limit} should return a pagination metadata if the limit is set to zero', () => {
        let page     = 1,
            limit    = 0,
            metadata = {"docs":[],"totalDocs":500,"limit":0,"hasPrevPage":false,"hasNextPage":true,"page":1,"totalPages":null,"prevPage":null,"nextPage":2}
        
        PostMock
            .expects('paginate')
            .withArgs({}, {page, limit})
            .callsArgWith(2, null, metadata)

        return api
            .get(`/${page}/${limit}`)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                PostMock.verify()
                expect(response.body).to.eql(metadata)
            })
    })

    it('PUT /{id} should update and return a blog post by id', () => {
        post.title = 'UPDATED TITLE';

        PostMock
            .expects('updateOne')
            .withArgs({_id: post._id}, post)
            .callsArgWith(2, null, post)

        return api
            .put(`/${post._id}`)
            .set('Accept', 'application/json')
            .send(post)
            // .expect('Content-Type', /json/)
            // .expect(200)
            .then(response => {
                PostMock.verify()
                expect(response.body).to.eql(post)
            })
    })

    it('DELETE /{id} should delete and return a blog post by id', () => {
        PostMock
            .expects('deleteOne')
            .withArgs({_id: post._id})
            .callsArgWith(1, null, post)

        return api
            .delete(`/${post._id}`)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                PostMock.verify()
                expect(response.body).to.eql(post)
            })
    })

    it.skip('POST / should create and return a new blog post', () => {
        let newPost = Object.assign({}, post)

        delete newPost._id;
        delete newPost.comments;

        let stub = sinon.createStubInstance(Post, {
            save: sinon.stub().returns(post)
        })

        return api
            .post('/')
            .set('Accept', 'application/json')
            .send(post)
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                expect(stub.save.called).to.be.true
                expect(response.body).to.eql(post)
            })
    })

    it('/populate endpoint should populate the database with test data', () => {
        PostMock
            .expects('insertMany')
            .withArgs(data)
            .callsArgWith(1, null, data)

        return api
            .get('/populate')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                PostMock.verify()
                expect(response.body).to.eql(data)
            })
    })

})