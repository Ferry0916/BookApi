using BookStoreApi.Models;
using BookStoreApi.Services;
using Microsoft.AspNetCore.Mvc;


namespace BookStoreApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BooksController : ControllerBase
{
    private readonly BooksService _booksService;

    public BooksController(BooksService booksService) =>
        _booksService = booksService;



    //DTO APPLIED
    [HttpGet]
    public async Task<List<BookItemDTO>> Get()
    {
        var books = await _booksService.GetAsync();

        return books.Select(book => new BookItemDTO(book)).ToList();
    }





    //DTO APPLIED
    [HttpGet("{id:length(24)}")]
    public async Task<ActionResult<BookItemDTO>> Get(string id)
    {
        var book = await _booksService.GetAsync(id);

        if (book is null)
        {
            return NotFound();
        }
        return new BookItemDTO(book);
    }







    //DTO applied
    [HttpPost]
    public async Task<IActionResult> Post(BookItemDTO newBook)
    {

        var book = new Book
        {
            BookName = newBook.BookName,
            Price = newBook.Price,
            Category = newBook.Category,
            Author = newBook.Author
        };
        await _booksService.CreateAsync(book);

        return CreatedAtAction(nameof(Get), new { id = book.Id }, new BookItemDTO(book) );
    }








    //DTO applied

    [HttpPut("{id:length(24)}")]
    public async Task<IActionResult> Update(string id, BookItemDTO bookDTO)
    {
        var book = await _booksService.GetAsync(id);

        if (book is null)
        {
            return NotFound();
        }

        var bookUpdate = new Book
        {
            Id = book.Id,
            BookName = bookDTO.BookName,
            Price = bookDTO.Price,
            Category = bookDTO.Category,
            Author = bookDTO.Author
        };

        await _booksService.UpdateAsync(id, bookUpdate);

        return NoContent();
    }




    // no need for dto
    [HttpDelete("{id:length(24)}")]
    public async Task<IActionResult> Delete(string id)
    {
        var book = await _booksService.GetAsync(id);

        if (book is null)
        {
            return NotFound();
        }

        await _booksService.RemoveAsync(id);

        return NoContent();
    }
}