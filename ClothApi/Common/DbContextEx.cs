using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;


namespace ClothApi.Common
{
    public static class DBContextEx
    {
        public static void TryUpdateManyToMany<T>(this DbContext db, IEnumerable<T> currentItems, IEnumerable<T> newItems, Func<T, T, bool> getKey) where T : class
        {   
            var toRemove = currentItems.Except(newItems, getKey).ToList();
            db.Set<T>().RemoveRange(toRemove);
            var toAdd = newItems.Except(currentItems, getKey).ToList();
            db.Set<T>().AddRange(toAdd);
        }

        public static IEnumerable<T> Except<T >(this IEnumerable<T> listA, IEnumerable<T> listB, Func<T, T, bool> lambda)
        {
            return listA.Except(listB, new LambdaComparer<T>(lambda));
        }

        /// <summary>
        /// Returns all items in the first collection that intersect the ones in the second collection that match the lambda condition
        /// </summary>
        /// <typeparam name="T">The type</typeparam>
        /// <param name="listA">The first list</param>
        /// <param name="listB">The second list</param>
        /// <param name="lambda">The filter expression</param>
        /// <returns>The filtered list</returns>
        public static IEnumerable<T> Intersect<T>(this IEnumerable<T> listA, IEnumerable<T> listB, Func<T, T, bool> lambda)
        {
            return listA.Intersect(listB, new LambdaComparer<T>(lambda));
        }

    }
}