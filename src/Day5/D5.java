package Day5;
import java.io.File;
import java.util.Scanner;

public class D5 {
    public static void main(String[] args) throws Exception {
        int x1, x2, y1, y2, length, lenght;
        int c = 0;
        int[][] grid = new int[1000][1000];
        File input = new File("./src/Day5/input");
        Scanner l = new Scanner(input).useDelimiter(",| -> |\\n");

        while (l.hasNextLine()) {
            x1 = l.nextInt();
            y1 = l.nextInt();
            x2 = l.nextInt();
            y2 = l.nextInt();
            if (y1 == y2){
                length = x1-x2;
                for (int w = Math.abs(length); w >= 0; w--) {
                    grid[x1-length][y1] ++;
                    if (length > 0) length--;
                    if (length < 0) length++;
                }
            }
            else if (x1 == x2){
                length = y1-y2;
                for (int w = Math.abs(length); w >= 0; w--) {
                    grid[x1][y1-length] ++;
                    if (length > 0) length--;
                    if (length < 0) length++;
                }
            }
            else {
                length = x1-x2;
                lenght = y1-y2;
                for (int w = Math.abs(length); w >= 0; w--) {
                    grid[x1-length][y1-lenght] ++;
                    if (length > 0) length--;
                    if (length < 0) length++;
                    if (lenght > 0) lenght--;
                    if (lenght < 0) lenght++;
                }
            }
        }
        for (int x = 0; x < 1000; x++) {
            for (int y = 0; y < 1000; y++) {
                if (grid[x][y] > 1) c++;
            }
        }
        l.close();
        System.out.println(c);
    }
}
