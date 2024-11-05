namespace BookStoreApi.Models
{
    public class BookItemDTO
    {
        public string? Id { get; set; }
        public string BookName { get; set; }
        public decimal Price { get; set; }
        public string Category { get; set; }
        public string Author { get; set; }

        public BookItemDTO()
        {

        }

        public BookItemDTO(Book bookItem)
        {
            Id = bookItem.Id;
            BookName = bookItem.BookName;
            Price = bookItem.Price;
            Category = bookItem.Category;
            Author = bookItem.Author;

        }
    }
}
